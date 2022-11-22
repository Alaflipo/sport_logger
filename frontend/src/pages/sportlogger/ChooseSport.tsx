import React, { useEffect, useState } from "react";

//data types
import { ActivityData, SportTypes } from "../../DataTypes";

//material UI components
import { Box } from "@mui/system";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Link } from "react-router-dom";

//Styling
const CardStyling: SxProps = {
    backgroundColor: "secondary.light",
    maxWidth: "700px",
    width: "90%",
    margin: "10px auto",
    padding: "10px",
    borderRadius: 2,
    border: "2px solid",
    borderColor: "primary.main",
};

const DividerStyling: SxProps = {
    maxWidth: "250px",
    margin: "10px auto",
    border: 0.5,
    borderColor: "primary.main",
};

const ActivityStyling: SxProps = {
    margin: "2px auto",
    width: "300px",
};

const ChooseSport = () => {
    let [activities, setActivities] = useState<ActivityData[]>([]);
    let [filteredActivities, setFilteredActivities] = useState<
        Array<Array<ActivityData>>
    >(new Array(SportTypes.length));

    const getActivities = async () => {
        console.log(filteredActivities);
        const response = await fetch("api/activ", {
            headers: {
                accepts: "application/json",
            },
        });
        const data = await response.json();
        setActivities(data);

        let newFilteredActivities = [...filteredActivities];

        // Fill with non identical arrays
        for (let i = 0; i < SportTypes.length; i++) {
            newFilteredActivities[i] = [];
        }

        for (let i = 0; i < data.length; i++) {
            let typeIndex = SportTypes.findIndex(
                (type) => type.label === data[i].type
            );
            newFilteredActivities[typeIndex].push(data[i]);
        }
        setFilteredActivities(newFilteredActivities);
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <Box>
            <Stack>
                <Typography variant="h5">Choose a Activity: </Typography>
                {filteredActivities.map((activitiesType, index) => {
                    return (
                        <Box key={SportTypes[index].label} sx={CardStyling}>
                            <Typography variant="h5">
                                {SportTypes[index].label}
                            </Typography>
                            <Divider sx={DividerStyling} />
                            <Stack>
                                {activitiesType.map((activity) => {
                                    return (
                                        <Link
                                            to={`/logsport/${activity.id}`}
                                            style={{ textDecoration: "none" }}
                                            key={activity.id}
                                        >
                                            <Button
                                                variant="contained"
                                                key={activity.id}
                                                sx={ActivityStyling}
                                            >
                                                {activity.name}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </Stack>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default ChooseSport;
