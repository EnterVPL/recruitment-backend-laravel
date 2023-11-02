import { Card, CardContent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DefaultClient } from "../../default.http.client";

const BookEdit = ({ id, isOpen = false }) => {
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
                        <TextField label="author" value={data.author} />
                        <TextField label="titile" value={data.titile} />
                        <TextField
                            label="year_published"
                            value={data.year_published}
                        />
                        <TextField
                            label="description"
                            value={data.description}
                        />
                        <TextField label="category" value={data.category} />
                    </CardContent>
                </Card>
            ) : null}
        </>
    );
};

export default BookEdit;
