import { Button, Stack, SxProps, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TextStyle: SxProps = {
    marginRight: "30px",
    marginLeft: "30px",
    margin: "10px auto",
    maxWidth: "300px",
};

const HomeScreen = () => {
    return (
        <div>
            <Stack>
                <Typography variant="h2">Welcome!</Typography>
                <Typography variant="body1" sx={TextStyle}>
                    This website is made to track the gym efforts of Morris and
                    Lisa.
                </Typography>
                <img
                    style={{ margin: "20px auto", width: "300px" }}
                    src={"meme.jpeg"}
                    srcSet={"meme.jpeg"}
                    alt={"meme"}
                    loading="lazy"
                />
                {/* <h3>View the current list of activities here: </h3>
            <Link to={`/activ/`}>
                <p>activity list</p>
            </Link>
            <h3>View the current list of users here: </h3>
            <Link to={`/users/`}>
                <p>user list</p>
            </Link>
            <h3>View the current personal activities here: </h3>
            <Link to={`/pactiv/`}>
                <p>pactiv list</p>
            </Link> */}
                <Link to={`/logsport/`} style={{ textDecoration: "none" }}>
                    <Button variant="contained">Start sport session</Button>
                </Link>
            </Stack>
        </div>
    );
};

export default HomeScreen;
