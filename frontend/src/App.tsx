import React from "react";
import "./App.css";
import ActivityList from "./pages/ActivityList";
import UserList from "./pages/UserList";

import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./pages/Home";
import ActivityPage from "./pages/ActivityPage";
import {
    createTheme,
    Grid,
    IconButton,
    SxProps,
    ThemeProvider,
    Tooltip,
    Typography,
} from "@mui/material";
import PersonalActivityList from "./pages/PersonalActivityList";
import PersonalActivityPage from "./pages/PersonalActivityPage";
import ChooseSport from "./pages/sportlogger/ChooseSport";
import LogActivityPage from "./pages/sportlogger/LogActivity";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";

const HeaderStyling: SxProps = {
    minHeight: "10vh",
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
            warning: {
                main: "#ffffff",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <header>
                        <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            sx={HeaderStyling}
                        >
                            <Grid item xs={2}>
                                <Tooltip title="home" placement="bottom">
                                    <IconButton
                                        color="warning"
                                        component={Link}
                                        to="/"
                                    >
                                        <HomeIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h4">LiMo Sport</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="activities" placement="bottom">
                                    <IconButton
                                        color="warning"
                                        component={Link}
                                        to="/activ"
                                    >
                                        <FitnessCenterIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
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
