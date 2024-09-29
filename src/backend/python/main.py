import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pyarrow as pa
from sentence_transformers import SentenceTransformer
import json
import logging
import numpy as np
import lancedb

app = FastAPI()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
db = None
table = None
embedding_model = None
comments_table = None

# Pydantic models
class User(BaseModel):
    ic: str
    name: str
    phoneNo: str
    email: str
    privilege: str
    avatar: Optional[str] = None

class Submission(BaseModel):
    id: str
    type: str
    subject: str
    body: str
    datetime: str
    agency: str
    tags: List[str]
    status: str
    user: User
    vote: int

class Comment(BaseModel):
    user: User  
    postedAt: str  
    comment: str  
    submission_id: str 

# Initialize the embedding model
def initialize_embedding_model():
    global embedding_model
    embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Generate embedding
def generate_embedding(text: str):
    embedding = embedding_model.encode(text)
    return np.array(embedding, dtype=np.float32)

# Convert submission to vector
async def submission_to_vector(submission: Submission):
    embedding = generate_embedding(submission.subject + " " + submission.body)
    return {
        "id": submission.id,
        "vector": embedding.tolist(),  # Convert numpy array to list
        "type": submission.type,
        "subject": submission.subject,
        "body": submission.body,
        "datetime": submission.datetime,
        "agency": submission.agency,
        "tags": json.dumps(submission.tags),
        "status": submission.status,
        "user_ic": submission.user.ic,
        "user_name": submission.user.name,
        "user_phoneNo": submission.user.phoneNo,
        "user_email": submission.user.email,
        "user_privilege": submission.user.privilege,
        "user_avatar": submission.user.avatar,
        "vote": submission.vote
    }

@app.on_event("startup")
async def startup_event():
    global db, table, embedding_model, comments_table
    try:
        initialize_embedding_model()
        db = lancedb.connect("data/lancedb")

        # Define the schema using PyArrow
        schema = pa.schema(
            [
                pa.field("id", pa.string()),
                pa.field('vector', pa.list_(pa.float32(), 384)),  # Specify the dimension (384 for 'all-MiniLM-L6-v2')
                pa.field('type', pa.string()),
                pa.field('subject', pa.string()),
                pa.field('body', pa.string()),
                pa.field('datetime', pa.string()),
                pa.field('agency', pa.string()),
                pa.field('tags', pa.string()),
                pa.field('status', pa.string()),
                pa.field('user_ic', pa.string()),
                pa.field('user_name', pa.string()),
                pa.field('user_phoneNo', pa.string()),
                pa.field('user_email', pa.string()),
                pa.field('user_privilege', pa.string()),
                pa.field('user_avatar', pa.string()),
                pa.field('vote', pa.int32())
            ]
        )

        schema2 = pa.schema(
            [
                pa.field('user_ic', pa.string()),
                pa.field('user_name', pa.string()),
                pa.field('user_phoneNo', pa.string()),
                pa.field('user_email', pa.string()),
                pa.field('user_privilege', pa.string()),
                pa.field('user_avatar', pa.string()),
            ]
        )

        # Create the table if it doesn't exist
        if "submissions" not in db.table_names():
            table = db.create_table("submissions", schema=schema, mode="overwrite")
            # Create FTS index
            table.create_fts_index(["subject", "body"])
        else:
            table = db.open_table("submissions")


        if "user" not in db.table_names():
            table2 = db.create_table("user", schema=schema2, mode="overwrite")
            # Create FTS index
            table2.create_fts_index(["subject", "body"])
        else:
            table2 = db.open_table("user")

        comments_schema = pa.schema(
            [
                pa.field("id", pa.int32()),
                pa.field("user_ic", pa.string()),
                pa.field("user_name", pa.string()),
                pa.field("user_phoneNo", pa.string()),
                pa.field("user_email", pa.string()),
                pa.field("user_privilege", pa.string()),
                pa.field("user_avatar", pa.string()),
                pa.field("postedAt", pa.string()),
                pa.field("comment", pa.string()),
                pa.field("submission_id", pa.string())
            ]
        )

        # Create or open comments table
        if "comments" not in db.table_names():
            comments_table = db.create_table("comments", schema=comments_schema, mode="overwrite")
        else:
            comments_table = db.open_table("comments")

        logger.info("Startup completed successfully")
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")
        raise

@app.post("/add_submission")
async def add_submission(submission: Submission):
    try:
        vector_data = await submission_to_vector(submission)
        table.add([vector_data])
        logger.info(f"Submission added: {submission.id}")
        return {"message": "Submission added successfully"}
    except Exception as e:
        logger.error(f"Error adding submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
    
@app.post("/add_comment")
async def add_comment(comment: Comment):
    try:
        comment_data = {
            "id": None,  
            "user_ic": comment.user.ic,
            "user_name": comment.user.name,
            "user_phoneNo": comment.user.phoneNo,
            "user_email": comment.user.email,
            "user_privilege": comment.user.privilege,
            "user_avatar": comment.user.avatar,
            "postedAt": comment.postedAt,  
            "comment": comment.comment,
            "submission_id": comment.submission_id  
        }

        comments_table.add([comment_data])
        logger.info(f"Comment added by user {comment.user.ic} to submission {comment.submission_id}")
        return {"message": "Comment added successfully"}
    except Exception as e:
        logger.error(f"Error adding comment: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    

@app.get("/comments/{submission_id}")
async def get_comments(submission_id: str):
    try:
        # Perform the search and convert results to a pandas DataFrame
        results_df = comments_table.search().where(f"submission_id = '{submission_id}'").to_pandas()

        comments = []
        for _, row in results_df.iterrows():
            comment = Comment(
                user=User(
                    ic=row['user_ic'],
                    name=row['user_name'],
                    phoneNo=row['user_phoneNo'],
                    email=row['user_email'],
                    privilege=row['user_privilege'],
                    avatar=row['user_avatar']
                ),
                postedAt=row['postedAt'],
                comment=row['comment'],
                submission_id=row['submission_id']
            )
            comments.append(comment)

        return comments
    except Exception as e:
        logger.error(f"Error retrieving comments for submission {submission_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/vector_search")
async def vector_search(query: str, limit: int = 5):
    try:
        query_embedding = generate_embedding(query)
        logger.info(f"Generated query embedding of length: {len(query_embedding)}")

        # Perform the vector search
        results_df = table.search(query_embedding, vector_column_name='vector').limit(limit).to_pandas()
        logger.info(f"Search results: {results_df.to_dict()}")

        submissions = []
        for i, row in results_df.iterrows():
            submission = Submission(
                id=row['id'],
                type=row['type'],
                subject=row['subject'],
                body=row['body'],
                datetime=row['datetime'],
                agency=row['agency'],
                tags=json.loads(row['tags']),
                status=row['status'],
                user=User(
                    ic=row['user_ic'],
                    name=row['user_name'],
                    phoneNo=row['user_phoneNo'],
                    email=row['user_email'],
                    privilege=row['user_privilege'],
                    avatar=row['user_avatar']
                ),
                vote=row['vote']
            )
            submissions.append(submission)

        return submissions
    except Exception as e:
        logger.error(f"Error performing vector search: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/hybrid_search")
async def hybrid_search(query: str, limit: int = 5):
    try:
        query_embedding = generate_embedding(query)
        logger.info(f"Generated query embedding of length: {len(query_embedding)}")

        # Perform the vector search
        results_df = table.search(query_type="hybrid", vector_column_name='vector').vector(query_embedding).text(query).limit(limit).to_pandas()
        logger.info(f"Search results: {results_df.to_dict()}")

        submissions = []
        for i, row in results_df.iterrows():
            submission = Submission(
                id=row['id'],
                type=row['type'],
                subject=row['subject'],
                body=row['body'],
                datetime=row['datetime'],
                agency=row['agency'],
                tags=json.loads(row['tags']),
                status=row['status'],
                user=User(
                    ic=row['user_ic'],
                    name=row['user_name'],
                    phoneNo=row['user_phoneNo'],
                    email=row['user_email'],
                    privilege=row['user_privilege'],
                    avatar=row['user_avatar']
                ),
                vote=row['vote']
            )
            submissions.append(submission)

        return submissions
    except Exception as e:
        logger.error(f"Error performing hybrid search: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/submission/{submission_id}")
async def get_submission_by_id(submission_id: str):
    try:
        # Perform the search and convert results to a pandas DataFrame
        results_df = table.search().where(f"id = '{submission_id}'").limit(1).to_pandas()

        if results_df.empty:
            raise HTTPException(status_code=404, detail="Submission not found")

        row = results_df.iloc[0]
        submission = Submission(
            id=row['id'],
            type=row['type'],
            subject=row['subject'],
            body=row['body'],
            datetime=row['datetime'],
            agency=row['agency'],
            tags=json.loads(row['tags']),
            status=row['status'],
            user=User(
                ic=row['user_ic'],
                name=row['user_name'],
                phoneNo=row['user_phoneNo'],
                email=row['user_email'],
                privilege=row['user_privilege'],
                avatar=row['user_avatar']
            ),
            vote=row['vote']
        )

        return submission
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying submission by ID: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    

@app.get("/query_by_status")
async def query_by_status(status: str):
    try:
        # Perform the search and convert results to a pandas DataFrame
        results_df = table.search().where(f"status = '{status}'").limit(10).to_pandas()

        submissions = []
        # Iterate over DataFrame rows to create Submission objects
        for index, row in results_df.iterrows():
            submission = Submission(
                id=row['id'],
                type=row['type'],
                subject=row['subject'],
                body=row['body'],
                datetime=row['datetime'],
                agency=row['agency'],
                tags=json.loads(row['tags']),
                status=row['status'],
                user=User(
                    ic=row['user_ic'],
                    name=row['user_name'],
                    phoneNo=row['user_phoneNo'],
                    email=row['user_email'],
                    privilege=row['user_privilege'],
                    avatar=row['user_avatar']
                ),
                vote=row['vote']
            )
            submissions.append(submission)

        return submissions
    except Exception as e:
        logger.error(f"Error querying submissions by status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    

@app.put("/update_user")
async def update_user(user: User):
    try:
        # Check if the user exists in the database based on their 'ic'
        results_df = db.open_table("user").search().where(f"user_ic = '{user.ic}'").limit(1).to_pandas()

        if results_df.empty:
            raise HTTPException(status_code=404, detail="User not found")

        # Convert the user details to a dictionary to update the row
        updated_user_data = {
            "user_ic": user.ic,
            "user_name": user.name,
            "user_phoneNo": user.phoneNo,
            "user_email": user.email,
            "user_privilege": user.privilege,
            "user_avatar": user.avatar
        }

        # Update the user details in the table
        db.open_table("user").update(f"user_ic = '{user.ic}'", updated_user_data)
        logger.info(f"User {user.ic} updated successfully")
        return {"message": "User updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating user {user.ic}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)