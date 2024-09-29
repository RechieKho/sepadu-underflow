import { useParams } from "react-router-dom";
import SubmissionDetails from "./stories/SubmissionDetails";
import { Submission } from "./models/submission";
import { User } from "./models/user";

export default function ViewSubmission() {
  const params = useParams();

  const sampleUser = new User(
    "123456",
    "SSYOK",
    "1234567890",
    "ssyok@example.com",
    "community",
    "https://example.com/avatar1.jpg"
  );

  const sampleSubmission = new Submission(
    `${params.id}`, // This is how you get id: `params.id`. It obtains from the url automatically.
    "Complaint",
    `Issue with local park with id ${params.id}`,
    "There is a lot of litter in the local park...",
    "2024-09-20T10:30:00Z",
    "Parks Department",
    ["Environment", "Cleanliness"],
    "Open",
    sampleUser,
    5
  );

  return (
    <SubmissionDetails
      submission={sampleSubmission}
      onVote={(id, direction) => {
        console.log(`${id} with direction ${direction}.`);
      }}
    ></SubmissionDetails>
  );
}
