import {
    Autocomplete,
    Button,
    Grid,
    IconButton,
    Stack,
    SxProps,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";

export interface ActivityData {
    id?: number;
    name: string;
    description: string;
    type: string;
}

const emptyActivityData: ActivityData = {
    name: "",
    description: "",
    type: "Shoulders",
};

export const SportTypes = [
    { label: "Shoulders" },
    { label: "Chest" },
    { label: "Biceps" },
    { label: "Back" },
    { label: "Belly" },
];

const RowStyle = {
    width: "350px",
    textAlign: "left",
    margin: "10px auto",
};

const HeaderStyling: SxProps = {
    maxWidth: "350px",
    margin: "20px auto",
    overflowWrap: "break-word",
};

interface RowStackProps {
    label: string | undefined;
    var: keyof ActivityData;
    placeholder: string | undefined;
    value: string | undefined;
    multiline?: boolean;
    options?: any;
    activity: ActivityData | null;
    setActivity: any;
}

const RowStack = (props: RowStackProps) => {
    // This needs to be done because ActivityData has mixed values of strings and integers
    function updateActivity<Key extends keyof ActivityData>(
        key: Key,
        value: ActivityData[Key]
    ) {
        let newActivity = { ...props.activity };
        newActivity[key] = value;
        props.setActivity(newActivity);
    }

    return (
        <Stack
            direction="row"
            alignItems="baseline"
            justifyContent={"space-between"}
            sx={RowStyle}
            spacing={1}
        >
            <Typography variant="body1">{props.label}</Typography>
            {props.options ? (
                <Autocomplete
                    options={props.options.map((option: any) => option.label)}
                    onChange={(event, value: any) => {
                        updateActivity(props.var, value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ width: 200 }}
                            label={props.value}
                            placeholder={props.placeholder}
                            variant="outlined"
                        />
                    )}
                />
            ) : (
                <TextField
                    label={props.value}
                    sx={{ width: 200 }}
                    placeholder={props.placeholder}
                    multiline={props.multiline}
                    rows={props.multiline ? 2 : 1}
                    variant="outlined"
                    onChange={(e) => {
                        updateActivity(props.var, e.target.value);
                    }}
                />
            )}
        </Stack>
    );
};

// props: ActivityDisplayProps

const ActivityPage = () => {
    let { activityId } = useParams(); // to get params out
    let navigate = useNavigate(); // to get the url history
    let [activity, setActivity] = useState<ActivityData | null>(null);
    let [newActivity, setNewActivity] = useState<ActivityData | null>(null);

    useEffect(() => {
        getActivity();
    }, [activityId]);

    let getActivity = async () => {
        if (activityId === "new") {
            setActivity({ ...emptyActivityData });
            setNewActivity({ ...emptyActivityData });
            return;
        }
        let repsonse = await fetch(`/api/activ/${activityId}`);
        let data: ActivityData = await repsonse.json();
        setActivity(data);
        setNewActivity(data);
    };

    let deleteActivity = async () => {
        fetch(`/api/activ/${activityId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => navigate("/activ")); // navigate back to list
    };

    let addActivity = async () => {
        fetch("/api/activ/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        }).then(() => navigate("/activ"));
    };

    let updateActivity = async () => {
        fetch(`/api/activ/${activityId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        })
            .then((response) => response.json())
            .then((data) => setActivity(data));
    };

    let handleUpdate = () => {
        if (activityId === "new") {
            addActivity();
            console.log(newActivity);
        } else {
            updateActivity();
        }
    };

    return (
        <div>
            <Grid container spacing={0} alignItems="center" sx={HeaderStyling}>
                <Grid item xs={1}>
                    <Tooltip title="back" placement="top">
                        <IconButton component={Link} to="/activ">
                            <ArrowBackIosIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        {activityId === "new" ? "Add" : "Edit"} activity
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="delete" placement="top">
                        <IconButton onClick={deleteActivity}>
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            <div>
                <RowStack
                    value={activity?.name}
                    var={"name"}
                    label={"Name:"}
                    placeholder={"Fill in the name..."}
                    activity={newActivity}
                    setActivity={setNewActivity}
                />
                <RowStack
                    value={activity?.type}
                    label={"Type:"}
                    var={"type"}
                    placeholder={"Fill in the type..."}
                    activity={newActivity}
                    setActivity={setNewActivity}
                    options={SportTypes}
                />
                <RowStack
                    value={activity?.description}
                    label={"Description:"}
                    var={"description"}
                    placeholder={"Fill in the description..."}
                    multiline
                    activity={newActivity}
                    setActivity={setNewActivity}
                />
            </div>

            <Button onClick={handleUpdate} variant="contained">
                {activityId === "new" ? "Add" : "Update"}
            </Button>
        </div>
    );
};

export default ActivityPage;
