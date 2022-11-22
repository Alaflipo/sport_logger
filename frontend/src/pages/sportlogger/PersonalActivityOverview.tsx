import {
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import { ActivityData, PersonalActivityData, UserData } from "../../DataTypes";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend
);

interface PersonalActivityOverviewProps {
    user: UserData;
    activity: ActivityData;
}

const PersonalActivityOverview = (props: PersonalActivityOverviewProps) => {
    const [personalActivities, setPersonalActivities] =
        useState<Array<PersonalActivityData> | null>(null);

    const [currentWeight, setCurrentWeight] = useState<number>(0);
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());

    useEffect(() => {
        getPersonalActivities();
    }, []);

    const getPersonalActivities = async () => {
        let repsonse = await fetch(
            `/api/pactiv/filter/${props.activity.id}/${props.user.id}`
        );
        let data: Array<PersonalActivityData> = await repsonse.json();
        setPersonalActivities(data);
    };

    const getLineData = () => {
        const labels = personalActivities
            ? personalActivities.map((pa) => {
                  const date = new Date(pa.date);
                  const dateString = `${date.getDate()}/${date.getMonth()}`;
                  return dateString;
              })
            : [];
        const data = personalActivities
            ? personalActivities.map((pa) => {
                  return pa.weight;
              })
            : [];
        const weights_data = {
            labels,
            datasets: [
                {
                    label: "Weight progression",
                    data: data,
                    fill: false,
                    borderColor: "#ae2012",
                    tension: 0,
                },
            ],
        };
        return weights_data;
    };

    const postPersonalActivity = () => {
        const newPA: PersonalActivityData = {
            person: props.user.id!,
            activity: props.activity.id!,
            weight: currentWeight,
            date: date ? date.format() : "",
        };

        fetch(`/api/pactiv/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPA),
        }).then(getPersonalActivities);
    };

    let deletePActivity = async (pactivityId: any) => {
        fetch(`api/pactiv/${pactivityId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(getPersonalActivities);
    };

    return personalActivities ? (
        <Box>
            <Table size={"small"} sx={{ width: "300px", margin: "20px auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Weight</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personalActivities.map((pa) => {
                        const date = new Date(pa.date);
                        return (
                            <TableRow key={pa.id}>
                                <TableCell>{pa.weight}</TableCell>
                                <TableCell>
                                    {date.getDate()}/{date.getMonth()}/
                                    {date.getFullYear()}
                                    {" - "}
                                    {date.getHours()}:{date.getMinutes()}:
                                    {date.getSeconds()}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="delete" placement="top">
                                        <IconButton
                                            onClick={() =>
                                                deletePActivity(pa.id)
                                            }
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <Box
                style={{
                    width: "400px",
                    margin: "10px auto",
                    alignContent: "center",
                }}
            >
                <Line data={getLineData()} />
            </Box>
            <Stack>
                <Stack
                    direction={"row"}
                    sx={{ width: 300, margin: "10px auto" }}
                >
                    <TextField
                        label="weight"
                        placeholder={"Add weight..."}
                        variant="outlined"
                        onChange={(e) => {
                            setCurrentWeight(parseFloat(e.target.value));
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Date mobile"
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={(value) => setDate(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Stack>
                <Button
                    sx={{ width: 150, margin: "10px auto" }}
                    variant="contained"
                    onClick={postPersonalActivity}
                >
                    Add Activity
                </Button>
            </Stack>
        </Box>
    ) : null;
};

export default PersonalActivityOverview;
