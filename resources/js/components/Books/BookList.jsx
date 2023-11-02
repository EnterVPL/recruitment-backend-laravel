import { useEffect, useState } from "react";
import { DefaultClient } from "../../default.http.client";
import { Box, Pagination } from "@mui/material";
import BookItemList from "./BookItemList";
import SearchBar from "../SearchBar";

const BookList = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
    });
    const [query, setQuery] = useState("");
    let timeout = setTimeout(() => {}, 0);

    useEffect(() => {
        const getData = async () => {
            const responseData = await DefaultClient.getBooks(
                pagination.page,
                query
            );
            setData(responseData.data);
            setPagination({
                page: responseData.current_page,
                maxPage: responseData.last_page,
                perPage: responseData.per_page,
            });
        };
        getData();
    }, [setData, pagination.page, query]);

    const changePage = (page) => {
        setPagination({
            page: page,
            maxPage: pagination.maxPage,
            perPage: pagination.perPage,
        });
    };

    return (
        <>
            <SearchBar
                setSearchQuery={(value) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        setQuery(value);
                    }, 1000);
                }}
            />
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
                            title={item.title}
                            author={item.author}
                            description={item.description}
                            published={item.year_published}
                            query={query}
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
