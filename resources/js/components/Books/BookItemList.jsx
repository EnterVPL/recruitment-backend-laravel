import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    Typography,
} from "@mui/material";
import { Marker } from "react-mark.js";
import BookDetails from "./BookDetails";
import { useState } from "react";
import BookEdit from "./BookEdit";

const BookItemList = ({
    isAuth,
    id,
    title,
    author,
    description,
    published,
    query = "",
    category = null,
}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const toogleDialog = () => {
        setOpenDialog(!openDialog);
    };

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
                    {category ? (
                        <Typography sx={{ marginBottom: 2 }} variant="body2">
                            {category}
                        </Typography>
                    ) : null}
                    <Typography
                        sx={{ marginBottom: 1, fontSize: "1.3em" }}
                        variant="body2"
                    >
                        <strong>
                            <Marker mark={query}>{title}</Marker>
                        </strong>
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={toogleDialog}>View Details</Button>
                </CardActions>
            </Card>
            <Dialog open={openDialog} closeDialog={toogleDialog}>
                {isAuth ? (
                    <BookEdit id={id} isOpen={openDialog} />
                ) : (
                    <BookDetails id={id} isOpen={openDialog} />
                )}
                <DialogActions>
                    <Button autoFocus onClick={toogleDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BookItemList;
