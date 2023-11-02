import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DefaultClient } from "../../default.http.client";

const BookDetails = ({ id, isOpen = false }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const responseData = await DefaultClient.getBook(id);
            setData(responseData);
        };
        if (isOpen) {
            getData();
        }
    }, [isOpen]);

    return (
        <>
            {isOpen ? (
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: "1.2em" }} variant="body1">
                            {`Author: ${data.author}`}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }} variant="body2">
                            {`Year published: ${data.year_published}`}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }} variant="body2">
                            {`Category: ${data.category?.name || "none"}`}
                        </Typography>
                        <Typography
                            sx={{ marginBottom: 1, fontSize: "1.3em" }}
                            variant="body1"
                        >
                            <strong>{data.title}</strong>
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }} variant="body2">
                            {data.description}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }} variant="body2">
                            {`Available copies: ${data.available_copies}`}
                        </Typography>
                    </CardContent>
                </Card>
            ) : null}
        </>
    );
};

export default BookDetails;
