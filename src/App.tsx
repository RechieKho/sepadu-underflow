import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./stories/Header";
import Footer from "./stories/Footer";
import { Container, Divider, Stack, Typography } from "@mui/material";
import SubmissionTable from "./stories/SubmissionTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import UnknownPage from "./UnknownPage";
import ViewSubmission from "./ViewSubmission";
import { useState, useEffect } from "react";
import axios from "axios";
import VectorDBHandler from "./components/VectorDBHandler";
import AddSubmission from "./components/AddSubmission";

function App() {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(
        "https://localhost:8000/query_by_status?status=Open"
      );
      console.log(response.data);
      const formattedSubmissions = response.data.map(
        (submission: {
          id: any;
          subject: any;
          type: any;
          tags: string;
          status: any;
          datetime: string | number | Date;
          vote: any;
          agency: any;
          body: any;
          user_ic: any;
          user_name: any;
          user_phoneNo: any;
          user_email: any;
          user_privilege: any;
          user_avatar: any;
        }) => ({
          id: submission.id,
          title: submission.subject,
          type: submission.type,
          tag: submission.tags[0], // Parse the JSON string and get the first tag
          status: submission.status,
          date: new Date(submission.datetime),
          upvote: submission.vote,
          agency: submission.agency,
          body: submission.body,
          user: {
            ic: submission.user_ic,
            name: submission.user_name,
            phoneNo: submission.user_phoneNo,
            email: submission.user_email,
            privilege: submission.user_privilege,
            avatar: submission.user_avatar,
          },
        })
      );
      setSubmissions(formattedSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Stack
          direction="column"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "100svh",
            m: 0,
          }}
          divider={<Divider orientation="horizontal" flexItem></Divider>}
        >
          <Header
            onHomeRequested={() => navigate("/")}
            onSearchRequested={(query) => {
              if (query.length === 0) return;
              navigate(`/search/${query}`);
            }}
          ></Header>

          {/* The content */}
          <Container
            sx={{
              p: 3,
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Typography variant="h6">Your submission</Typography>
                    <SubmissionTable entries={submissions}></SubmissionTable>
                    <Typography variant="h6">Public submission</Typography>
                    <SubmissionTable entries={submissions}></SubmissionTable>
                  </>
                }
              ></Route>
              <Route
                path="/submission/:id"
                element={<ViewSubmission></ViewSubmission>}
              ></Route>
              <Route
                path="/search/:query"
                element={<VectorDBHandler />}
              ></Route>
              <Route path="/addSubmission" element={<AddSubmission />} />
              <Route path="*" element={<UnknownPage></UnknownPage>}></Route>
            </Routes>
          </Container>

          <Footer></Footer>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
