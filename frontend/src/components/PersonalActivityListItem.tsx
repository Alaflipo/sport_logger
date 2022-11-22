import React from "react";
import { Link } from "react-router-dom";
import { PersonalActivityData } from "../DataTypes";

// Styling
import { Box, Button, SxProps, Typography } from "@mui/material";

const CardStyling: SxProps = {
    backgroundColor: "secondary.light",
    maxWidth: "700px",
    margin: "10px auto",
    borderRadius: 2,
    padding: "10px",
    border: "5px solid",
    borderColor: "primary.main",
    align: "center",
    textAlign: "center",
};

const BodyStyling: SxProps = {
    width: "300px",
    textAlign: "left",
    margin: "10px auto",
};

interface PActivityListItemProps {
    pactivity: PersonalActivityData;
    pactivityId: number | undefined;
    people: [] | undefined;
    activities: [] | undefined;
}

const PersonalActivityListItem = (props: PActivityListItemProps) => {
    let getPersonName = () => {
        let user: any = props.people?.find(
            (value: any) => props.pactivity.person === value.id
        );
        return user ? user.name : "";
    };

    let getActivityName = () => {
        let activity: any = props.activities?.find(
            (value: any) => props.pactivity.activity === value.id
        );
        return activity ? activity.name : "";
    };

    return (
        <div>
            <Box sx={CardStyling}>
                <Box sx={BodyStyling}>
                    <Typography variant="body1">
                        Person: {getPersonName()}
                    </Typography>
                    <Typography variant="body1">
                        Activity: {getActivityName()}
                    </Typography>
                    <Typography variant="body1">
                        Weight: {props.pactivity.weight}
                    </Typography>
                    <Typography variant="body1">
                        Time: {props.pactivity.date}
                    </Typography>
                </Box>
                <Link
                    to={`/pactiv/${props.pactivity.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <Button variant="contained">edit</Button>
                </Link>
            </Box>
        </div>
    );
};

export default PersonalActivityListItem;
