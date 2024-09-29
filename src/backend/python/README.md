# Vector Search API

This project implements a vector search API using FastAPI and LanceDB.

## Setup and Installation

1. Create a virtual environment:

```
python -m venv venv
```

2. Activate the virtual environment:

- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```

3. Install the required packages:

```
pip install -r requirements.txt
```

## Running the Application

1. Start the FastAPI server:

```
python main.py
```

2. Open your web browser and go to:
   [https://localhost:8000/docs](https://localhost:8000/docs)

This will open the Swagger UI where you can interact with the API and see its documentation.

## API Endpoints

- `POST /add_submission`: Add a new submission to the database.
- `GET /vector_search`: Perform a vector search based on a query string.
- `GET /hybrid_search`: Perform a hybrid search based on a query string.
- `GET /query_by_status`: Query submissions by their status.

For detailed information about request and response formats, please refer to the Swagger UI documentation.

## Notes

- Make sure you have Python 3.7+ installed on your system.
- The application uses LanceDB for vector storage and search. Ensure you have sufficient disk space for the database.
- The embedding model used is 'all-MiniLM-L6-v2'. The first run might take some time as it downloads the model.

## Troubleshooting

If you encounter any issues, please check the console output for error messages. Most common issues are related to package installation or database initialization.
