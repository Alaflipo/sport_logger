import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//material ui
import {
    Autocomplete,
    Box,
    Grid,
    IconButton,
    SxProps,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";

//Data types
import { ActivityData, UserData } from "../../DataTypes";
import PersonalActivityOverview from "./PersonalActivityOverview";

//styling
const HeaderStyling: SxProps = {
    maxWidth: "350px",
    margin: "20px auto",
    overflowWrap: "break-word",
};

const LogActivityPage = () => {
    const { activityId } = useParams();

    let [activity, setActivity] = useState<ActivityData | null>(null);
    let [users, setUsers] = useState<Array<UserData> | null>(null);
    let [currentUser, setCurrentUser] = useState<UserData | null>(null);

    useEffect(() => {
        getActivity();
        getUsers();
    }, []);

    let getActivity = async () => {
        let repsonse = await fetch(`/api/activ/${activityId}`);
        let data: ActivityData = await repsonse.json();
        setActivity(data);
    };

    let getUsers = async () => {
        let repsonse = await fetch(`/api/users/`);
        let data: Array<UserData> = await repsonse.json();
        setUsers(data);
        setCurrentUser(data[0]);
    };

    return (
        <Box>
            <Grid container spacing={0} alignItems="center" sx={HeaderStyling}>
                <Grid item xs={1}>
                    <Tooltip title="back" placement="top">
                        <IconButton component={Link} to="/logsport">
                            <ArrowBackIosIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="h5">{activity?.name}</Typography>
                </Grid>
            </Grid>

            <Autocomplete
                disablePortal
                options={users ? users : []}
                value={currentUser}
                sx={{ margin: "10px auto", width: "300px" }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="User" />}
                onChange={(event, value: any) => {
                    setCurrentUser(value);
                }}
            />

            {currentUser && activity ? (
                <PersonalActivityOverview
                    key={currentUser.id}
                    user={currentUser}
                    activity={activity}
                />
            ) : null}
        </Box>
    );
};

export default LogActivityPage;
