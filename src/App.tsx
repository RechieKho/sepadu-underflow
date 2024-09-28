import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./stories/Header";
import Footer from "./stories/Footer";
import { Container, Divider, Stack, Typography } from "@mui/material";
import SubmissionTable from "./stories/SubmissionTable";
import { Route, Routes } from "react-router-dom";
import UnknownPage from "./UnknownPage";

const sampleEntries = [
  {
    id: 1,
    title: "Busted toilet",
    type: "Complaint",
    tag: "Welfare",
    status: "submitted",
    date: new Date(Date.now()),
    upvote: 10,
  },
  {
    id: 2,
    title: "Used needles",
    type: "Complaint",
    tag: "Health",
    status: "submitted",
    date: new Date(Date.now()),
    upvote: 1,
  },
  {
    id: 3,
    title: "Misinformation",
    type: "Complaint",
    tag: "Politics",
    status: "ongoing",
    date: new Date(Date.now()),
    upvote: 10000,
  },
];

function App() {
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
            onSearchRequested={(query) => {
              console.log(`Query requested: '${query}'`);
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
                    <SubmissionTable entries={sampleEntries}></SubmissionTable>
                    <Typography variant="h6">Public submission</Typography>
                    <SubmissionTable entries={sampleEntries}></SubmissionTable>
                  </>
                }
              ></Route>
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
