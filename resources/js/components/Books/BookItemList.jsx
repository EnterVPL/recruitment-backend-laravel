import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Marker } from "react-mark.js";

const BookItemList = ({
    title,
    author,
    description,
    published,
    query = "",
}) => {
    return (
        <>
            <Card sx={{ maxWidth: 200 }}>
                <CardContent>
                    <Typography sx={{ fontSize: "1.2em" }} variant="body1">
                        <Marker mark={query}>{author}</Marker>
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }} variant="body2">
                        {published}
                    </Typography>
                    <Typography
                        sx={{ marginBottom: 1, fontSize: "1.3em" }}
                        variant="body1"
                    >
                        <strong>
                            <Marker mark={query}>{title}</Marker>
                        </strong>
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default BookItemList;
