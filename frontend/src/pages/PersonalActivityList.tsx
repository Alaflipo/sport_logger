import { Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonalActivityListItem from "../components/PersonalActivityListItem";
import { PersonalActivityData } from "../DataTypes";

const PersonalActivityList = () => {
    let [pactivities, setPActivities] = useState([]);
    let [people, setPeople] = useState();
    let [activities, setActivities] = useState();

    useEffect(() => {
        getPActivities();
        getPeople();
        getActivities();
    }, []);

    let getPActivities = async () => {
        let response = await fetch("api/pactiv", {
            headers: {
                accepts: "application/json",
            },
        });
        let data = await response.json();
        setPActivities(data);
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

    return (
        <div>
            <div className="notes-list">
                <Stack>
                    {pactivities.map(
                        (pactivity: PersonalActivityData, index) => (
                            <PersonalActivityListItem
                                key={index}
                                pactivity={pactivity}
                                pactivityId={pactivity.id}
                                people={people}
                                activities={activities}
                            />
                        )
                    )}
                </Stack>
                <Link to="/pactiv/new" style={{ textDecoration: "none" }}>
                    <Button variant="contained">Add Activity</Button>
                </Link>
            </div>
        </div>
    );
};

export default PersonalActivityList;
