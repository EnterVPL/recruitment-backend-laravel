import { Button, Container } from "@mui/material";
import BookList from "./Books/BookList";
import { useState } from "react";
import { DefaultClient } from "../default.http.client";

const Home = () => {
    const [token, setToken] = useState("");

    const toggleLogin = async () => {
        if (token == "") {
            setToken(await DefaultClient.auth("test@example.com", "password"));
            DefaultClient.accessToken = token;
        } else {
            setToken("");
            DefaultClient.accessToken = token;
        }
    };

    return (
        <Container
            sx={{
                marginTop: "16px",
                marginBottom: "16px",
            }}
        >
            <Button onClick={toggleLogin}>
                {token == "" ? "Login" : "Logout"}
            </Button>
            <BookList isAuth={token != ""} />
        </Container>
    );
};

export default Home;
