import { Container } from "@mui/material";
import BookList from "./Books/BookList";

const Home = () => {
    return (
        <Container
            sx={{
                marginTop: "16px",
                marginBottom: "16px",
            }}
        >
            <BookList />
        </Container>
    );
};

export default Home;
