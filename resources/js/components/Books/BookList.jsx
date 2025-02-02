import { useEffect, useState } from "react";
import { DefaultClient } from "../../default.http.client";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
} from "@mui/material";
import BookItemList from "./BookItemList";
import SearchBar from "../SearchBar";
import BookAdd from "./BookAdd";

const BookList = ({ isAuth }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
    });
    const [query, setQuery] = useState("");
    const [pingRefresh, setPingRefresh] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const toogleDialog = () => {
        setOpenDialog(!openDialog);
    };

    let searchTimeout = setTimeout(() => {}, 0);

    useEffect(() => {
        const getData = async () => {
            const responseData = await DefaultClient.getBooks(
                pagination.page,
                query,
                category
            );
            setData(responseData.data);
            setPagination({
                page: responseData.current_page,
                maxPage: responseData.last_page,
                perPage: responseData.per_page,
            });
        };
        getData();
    }, [setData, pagination.page, query, pingRefresh, category]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await DefaultClient.getCategories();
            setCategories(categories);
        };
        getCategories();
    }, [setCategories]);

    const changePage = (page) => {
        setPagination({
            page: page,
            maxPage: pagination.maxPage,
            perPage: pagination.perPage,
        });
    };

    return (
        <>
            <Dialog open={openDialog} closeDialog={toogleDialog}>
                {isAuth ? (
                    <BookAdd
                        isOpen={openDialog}
                        handleAction={() => {
                            toogleDialog();
                            setPingRefresh(!pingRefresh);
                        }}
                    />
                ) : null}
                <DialogActions>
                    <Button autoFocus onClick={toogleDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <SearchBar
                setSearchQuery={(value) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        setQuery(value);
                    }, 1000);
                }}
            />
            <Button onClick={toogleDialog}>Add Book</Button>

            <InputLabel id="search-category-label">Category filter</InputLabel>

            <Select
                sx={{ width: 200 }}
                labelId="search-category-label"
                label="Category"
                onChange={(event) => {
                    setCategory(event.target.value);
                }}
            >
                <MenuItem value={null}>
                    <em>All</em>
                </MenuItem>
                {categories.map((categoryItem) => {
                    return (
                        <MenuItem value={categoryItem.id}>
                            {categoryItem.name}
                        </MenuItem>
                    );
                })}
            </Select>
            <Pagination
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                count={pagination.maxPage}
                page={parseInt(pagination.page)}
                onChange={(_event, value) => {
                    changePage(value);
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    justifyContent: "space-around",
                }}
            >
                {data.map((item) => {
                    return (
                        <BookItemList
                            key={item.id}
                            isAuth={isAuth}
                            id={item.id}
                            title={item.title}
                            author={item.author}
                            description={item.description}
                            published={item.year_published}
                            query={query}
                            category={item.category?.name}
                            onEdit={() => {
                                setPingRefresh(!pingRefresh);
                            }}
                        />
                    );
                })}
            </Box>

            <Pagination
                sx={{ marginTop: "8px", marginBottom: "8px" }}
                count={pagination.maxPage}
                page={parseInt(pagination.page)}
                onChange={(_event, value) => {
                    changePage(value);
                }}
            />
        </>
    );
};

export default BookList;
