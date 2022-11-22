import React from "react";
import "./App.css";
import ActivityList from "./pages/ActivityList";
import UserList from "./pages/UserList";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home";
import ActivityPage from "./pages/ActivityPage";
import { Box, createTheme, SxProps, ThemeProvider } from "@mui/material";
import PersonalActivityList from "./pages/PersonalActivityList";
import PersonalActivityPage from "./pages/PersonalActivityPage";
import ChooseSport from "./pages/sportlogger/ChooseSport";
import LogActivityPage from "./pages/sportlogger/LogActivity";

const HeaderStyling: SxProps = {
    minHeight: "20vh",
    display: "flex",
    backgroundColor: "primary.main",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
};

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#023047",
            },
            secondary: {
                main: "#ae2012",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <header>
                        <Box sx={HeaderStyling}>
                            <h1>Welcome to sportslogger</h1>
                        </Box>
                    </header>
                    <Routes>
                        <Route path="/" element={<HomeScreen />}></Route>
                        <Route path="/users">
                            <Route index element={<UserList />} />
                            <Route path=":userId" element={<UserList />} />
                        </Route>
                        <Route path="/activ">
                            <Route index element={<ActivityList />} />
                            <Route
                                path={":activityId"}
                                element={<ActivityPage />}
                            />
                        </Route>
                        <Route path="/pactiv">
                            <Route index element={<PersonalActivityList />} />
                            <Route
                                path={":pactivityId"}
                                element={<PersonalActivityPage />}
                            />
                        </Route>
                        <Route path="/logsport">
                            <Route index element={<ChooseSport />} />
                            <Route
                                path={":activityId"}
                                element={<LogActivityPage />}
                            />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
