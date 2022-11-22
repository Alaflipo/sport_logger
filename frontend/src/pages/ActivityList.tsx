import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityListItem from "../components/ActivityListItem";
import { ActivityData } from "../DataTypes";

const ActivityList = () => {
    let [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities();
    }, []);

    let getActivities = async () => {
        let response = await fetch("api/activ", {
            headers: {
                accepts: "application/json",
            },
        });
        let data = await response.json();
        console.log(data);
        setActivities(data);
    };

    return (
        <div>
            <div>
                <Stack>
                    {activities.map((activity: ActivityData, index) => (
                        <ActivityListItem
                            key={index}
                            activity={activity}
                            activityId={activity.id}
                        />
                    ))}
                </Stack>
                <Link to="/activ/new" style={{ textDecoration: "none" }}>
                    <Button variant="contained">Add Activity</Button>
                </Link>
            </div>
        </div>
    );
};

export default ActivityList;
