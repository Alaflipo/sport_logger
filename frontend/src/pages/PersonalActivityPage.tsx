import {
    Button,
    Grid,
    IconButton,
    SxProps,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import { emptyPersonalActivityData, PersonalActivityData } from "../DataTypes";
import RowStack from "../components/RowStack";

const HeaderStyling: SxProps = {
    maxWidth: "350px",
    margin: "20px auto",
    overflowWrap: "break-word",
};

const PersonalActivityPage = () => {
    let { pactivityId } = useParams(); // to get params out
    let navigate = useNavigate(); // to get the url history
    let [pactivity, setPActivity] = useState<PersonalActivityData | null>(null);
    let [newPActivity, setNewPActivity] = useState<PersonalActivityData | null>(
        null
    );
    let [people, setPeople] = useState([]);
    let [activities, setActivities] = useState([]);

    useEffect(() => {
        getPActivity();
        getPeople();
        getActivities();
    }, [pactivityId]);

    let getPActivity = async () => {
        if (pactivityId === "new") {
            setPActivity({ ...emptyPersonalActivityData });
            setNewPActivity({ ...emptyPersonalActivityData });
            return;
        }
        let repsonse = await fetch(`/api/pactiv/${pactivityId}`);
        let data: PersonalActivityData = await repsonse.json();
        setPActivity(data);
        setNewPActivity(data);
    };

    let getPeople = async () => {
        let repsonse = await fetch(`/api/users/`);
        let data = await repsonse.json();
        setPeople(data);
    };

    let getActivities = async () => {
        let repsonse = await fetch(`/api/activ/`);
        let data = await repsonse.json();
        setActivities(data);
    };

    let setData = (data: any) => {
        setNewPActivity(data);
    };

    let deletePActivity = async () => {
        fetch(`api/pactiv/${pactivityId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => navigate("/pactiv")); // navigate back to list
    };

    let addPActivity = async () => {
        fetch(`/api/pactiv/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPActivity),
        }).then(() => navigate("/pactiv"));
    };

    let updatePActivity = async () => {
        console.log(newPActivity);
        fetch(`/api/pactiv/${pactivityId}/edit`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPActivity),
        }).then(() => navigate("/pactiv"));
    };

    let handleUpdate = () => {
        if (pactivityId === "new") {
            addPActivity();
        } else {
            updatePActivity();
        }
    };

    return (
        <div>
            <Grid container spacing={0} alignItems="center" sx={HeaderStyling}>
                <Grid item xs={1}>
                    <Tooltip title="back" placement="top">
                        <IconButton component={Link} to="/pactiv">
                            <ArrowBackIosIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        {pactivityId === "new" ? "Add" : "Edit"} activity
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="delete" placement="top">
                        <IconButton onClick={deletePActivity}>
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            <div>
                <RowStack
                    value={pactivity?.person}
                    label={"User:"}
                    var={"person"}
                    placeholder={"Fill in the user..."}
                    data={newPActivity}
                    setData={setData}
                    options={people.map((p: any) => {
                        return { label: p.name, id: p.id };
                    })}
                />
                <RowStack
                    value={pactivity?.activity}
                    label={"Activity:"}
                    var={"activity"}
                    placeholder={"Fill in the activity..."}
                    data={newPActivity}
                    setData={setData}
                    options={activities.map((a: any) => {
                        return { label: a.name, id: a.id };
                    })}
                />
                <RowStack
                    value={pactivity?.weight}
                    var={"weight"}
                    label={"Weight:"}
                    placeholder={"Fill in your weight..."}
                    data={newPActivity}
                    setData={setData}
                />
            </div>

            <Button onClick={handleUpdate} variant="contained">
                {pactivityId === "new" ? "Add" : "Update"}
            </Button>
        </div>
    );
};

export default PersonalActivityPage;
