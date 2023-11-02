import {
    Button,
    Card,
    CardActions,
    CardContent,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DefaultClient } from "../../default.http.client";

const BookEdit = ({ id, isOpen = false, handleAction = () => {} }) => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [yearPublished, setYearPublished] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await DefaultClient.getBook(id);
            setAuthor(data.author);
            setTitle(data.title);
            setYearPublished(data.year_published);
            setDescription(data.description);
            setCategory(data.category_id);
            const categories = await DefaultClient.getCategories();
            setCategories(categories);
        };
        if (isOpen) {
            getData();
        }
    }, [isOpen]);

    const onSave = async () => {
        await DefaultClient.editBook(id, {
            author: author,
            title: title,
            yearPublished: yearPublished,
            description: description,
            category: category,
        });
        handleAction();
    };

    const onRemove = async () => {
        await DefaultClient.removeBook(id);
        handleAction();
    };

    return (
        <>
            {isOpen ? (
                <Card>
                    <CardContent>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            label="author"
                            value={author}
                            onChange={(event) => {
                                setAuthor(event.target.value);
                            }}
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            label="title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                        <TextField
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            label="year_published"
                            value={yearPublished}
                            onChange={(event) => {
                                setYearPublished(event.target.value);
                            }}
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            label="description"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                        <Select
                            fullWidth
                            label="category"
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}
                        >
                            {categories.map((categoryItem) => {
                                return (
                                    <MenuItem value={categoryItem.id}>
                                        {categoryItem.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </CardContent>
                    <CardActions>
                        <Button onClick={onSave} variant="contained">
                            Save
                        </Button>
                        <Button
                            onClick={onRemove}
                            variant="outlined"
                            color="error"
                        >
                            Remove
                        </Button>
                    </CardActions>
                </Card>
            ) : null}
        </>
    );
};

export default BookEdit;
