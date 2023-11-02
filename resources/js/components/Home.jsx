import { Button, Container } from "@mui/material";
import BookList from "./Books/BookList";
import { useState } from "react";
import { DefaultClient } from "../default.http.client";

const Home = () => {
    const [token, setToken] = useState("");

    const toggleLogin = async () => {
        if (token == "") {
            const accessToken = await DefaultClient.auth(
                "test@example.com",
                "password"
            );
            setToken(accessToken);
            DefaultClient.accessToken = accessToken;
        } else {
            setToken("");
            DefaultClient.accessToken = "";
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
