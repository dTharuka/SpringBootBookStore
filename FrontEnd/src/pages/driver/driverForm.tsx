import React, {ChangeEvent, useEffect, useState} from "react";

import {
    Button,
    FormHelperText,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import customerBackground from "../../assets/photo-1527176930608-09cb256ab504.png";
import {BookProperties} from "../../types/BookProperties";
import axios from "../../axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
import $ from "jquery";

const DriverForm = () => {
    /** hook for loading driver table */
    const [bookList, setBookList] = useState<BookProperties[]>([]);

    /** this hook is responsible to providing values to update and delete   */
    const [mongoPrimaryKeyDriver, mongoChangeDriver] = useState("");

    /** text-fields managing hooks  */
    const [bookID, bookIDChange] = useState("");
    const [bookTitle, bookTitleChange] = useState("");
    const [bookAuthor, bookAuthorChange] = useState("");
    const [bookPrice, bookPriceChange] = useState<number>(0);


    /** load all function */
    const getAllBooks = async () => {
        try {
            const response = await axios.get("book/get-all-books");
            setBookList(response.data.data);
            console.log(response);
            return "C00-00" + (bookList.length + 1);
        } catch (error) {
            console.log(error);
        }
    };

    function idIncrement() {
        getAllBooks();
        return "C00-00" + (bookList.length + 1);
    }

    useEffect(() => {
        getAllBooks().then((r) => {
            console.log(bookList);
        });
        idIncrement();
    }, []);

    const [ifBooleanType, booleanTYpeChange] = useState(false);

    const handleInputChangeDriver = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        switch (name) {
            case "bookID":
                bookIDChange(value);
                break;
            case "bookTitle":
                bookTitleChange(value);
                break;
            case "bookAuthor":
                bookAuthorChange(value);
                break;
            case "bookPrice":
                const price = value !== "" ? parseInt(value) : 0;
                bookPriceChange(price);
                break;
            default:
                break;
        }
    };

    const clearText = () => {
        bookIDChange("");
        bookTitleChange("");
        bookAuthorChange("");
        bookPriceChange(0);
    };

    const [book_title, book_title_change] =useState<boolean>(false);
    const [book_price, book_price_change] = useState<boolean>(false);
    const [book_author, book_author_change] = useState<boolean>(false);


    /** save function */
    const handleSubmitDriver = () => {
        let responseBodyForDriver = {
            bookID: $("#bookID").val(),
            bookTitle: bookTitle,
            bookPrice: bookPrice,
            bookAuthor: bookAuthor,
        };

        axios
            .post("book/save-book", JSON.stringify(responseBodyForDriver))
            .then((res) => {
                console.log(responseBodyForDriver);
                // booleanTYpeChange(false);
                getAllBooks();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    iconColor: "#2ed573",
                    backdrop: "true",
                    background: "#ffffff",
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                // success , error , warning , info , question ,width,color
                Toast.fire({
                    icon: "success",
                    title: "Saved Successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /** delete function */
    const handleDeleteDriver = () => {
        if (window.confirm("Do you want to remove this driver ?")) {
            axios
                .delete(`book/delete-book/`+$('#bookID').val())
                .then((response) => {
                    // booleanTYpeChange(false);
                    getAllBooks();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        iconColor: "#ff4757",
                        backdrop: "true",
                        background: "#ffffff",
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    // success , error , warning , info , question ,width,color

                    Toast.fire({
                        icon: "success",
                        title: "Delete Successfully!",
                    });

                })
                .catch((error) => {
                    console.log(error);
                    alert("Error deleting data. ");
                });
        }
    };

    /** update function */
    const handleUpdate = () => {
        let responseBody = {
            bookID: bookID,
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            bookPrice: bookPrice,
        };

        if (window.confirm("Do you want to update this driver ?")) {
            axios
                .put(`book/update-book`, JSON.stringify(responseBody))
                .then((response) => {
                    // booleanTYpeChange(false);
                    getAllBooks();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        width: "300px",
                        iconColor: "#ffa502",
                        backdrop: "true",
                        background: "#ffffff",
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });

                    // success , error , warning , info , question ,width,color
                    Toast.fire({
                        icon: "success",
                        title: "Update Successfully!",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error updating data. Because: " + error);
                });
        }
    };

    return (

        <section
            style={{
                boxShadow:
                    " rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                borderRadius: "15px",
                backgroundImage: `url(${customerBackground})`,
                backgroundSize: "cover",
            }}
            className="my-[70px] mx-20 xl:mx-60 xl:my-[80px] py-[50px] xl:py-16"
        >
            <div className="container mx-auto">
                <Paper
                    style={{
                        boxShadow:
                            " rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                        borderRadius: "15px",
                    }}
                >
                    <React.Fragment>
                        {/* <h2>Register Form</h2> */}
                        {/* <form onSubmit={handleSubmit} action={<Link to="/login" />}> */}
                        <form className="py-[15px] px-[15px]">
                            <FormHelperText style={{fontSize: "25px,"}}>
                                Driver Registration Form
                            </FormHelperText>
                            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                                <TextField
                                    value={ifBooleanType ? bookID : idIncrement()}
                                    name="bookID"
                                    id="bookID"
                                    type="text"
                                    variant="outlined"
                                    color="secondary"
                                    label="Book ID"
                                    size="small"
                                    fullWidth
                                    required
                                    onChange={handleInputChangeDriver}
                                />
                                <TextField
                                    value={bookTitle}
                                    name="bookTitle"
                                    type="text"
                                    variant="outlined"
                                    color={bookTitle ? "success" : "error"}
                                    onKeyUp={(e) => {
                                        if (/^[A-z]{3,30}$/.test(bookTitle)) {
                                            book_title_change(true);
                                        } else {
                                            book_title_change(false);
                                            if (e.key === "Tab" || e.key === "Enter") {
                                                e.preventDefault();
                                            }
                                        }
                                    }}
                                    label="Book Title"
                                    size="small"
                                    fullWidth
                                    required
                                    onChange={handleInputChangeDriver}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                                <TextField
                                    value={bookPrice}
                                    name="bookPrice"
                                    type="text"
                                    variant="outlined"
                                    label="Book Price"
                                    size="small"
                                    color={bookPrice ? "success" : "error"}
                                    onKeyUp={(e) => {
                                        if (/^[1-9]{2,10}$/.test(String(bookPrice))) {
                                            book_price_change(true);
                                        } else {
                                            book_price_change(false);
                                            if (e.key === "Tab" || e.key === "Enter") {
                                                e.preventDefault();
                                            }
                                        }
                                    }}
                                    fullWidth
                                    required
                                    onChange={handleInputChangeDriver}
                                />
                                <TextField
                                    value={bookAuthor}
                                    name="bookAuthor"
                                    type="text"
                                    variant="outlined"
                                    //color="secondary"
                                    label="Book Author"
                                    size="small"
                                    color={bookAuthor ? "success" : "error"}
                                    onKeyUp={(e) => {
                                        if (/^[A-z]{3,30}$/.test(bookAuthor)) {
                                            book_author_change(true);
                                        } else {
                                            book_author_change(false);
                                            if (e.key === "Tab" || e.key === "Enter") {
                                                e.preventDefault();
                                            }
                                        }
                                    }}
                                    fullWidth
                                    required
                                    onChange={handleInputChangeDriver}
                                />
                            </Stack>
                        </form>

                        <div className="ml-[15px] mt-[0px] pb-[15px]">
                            <Button
                                onClick={(e) => {
                                    handleSubmitDriver();
                                    clearText();
                                }}
                                style={{
                                    backgroundColor: "#039b48",
                                    marginRight: "7px",
                                    fontWeight: "bolder",
                                }}
                                variant="contained"
                                startIcon={<SaveIcon/>}
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                onClick={(e) => {
                                    handleUpdate();
                                    clearText();
                                }}
                                style={{
                                    backgroundColor: "#ffa502",
                                    marginRight: "7px",
                                    fontWeight: "bolder",
                                }}
                                variant="contained"
                                startIcon={<UpdateIcon/>}
                                type="submit"
                            >
                                Update
                            </Button>
                            <Button
                                onClick={(e) => {
                                    handleDeleteDriver();
                                    clearText();
                                }}
                                style={{
                                    backgroundColor: "#ff4757",
                                    marginRight: "7px",
                                    fontWeight: "bolder",
                                }}
                                variant="contained"
                                startIcon={<DeleteIcon/>}
                                type="submit"
                            >
                                Delete
                            </Button>
                        </div>
                    </React.Fragment>
                </Paper>

                <TableContainer
                    style={{
                        boxShadow:
                            " rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                        borderRadius: "15px",
                    }}
                    component={Paper}
                    className="mt-5"
                >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                className="bg-black"
                            >
                                <TableCell style={{color: "#ffffff", fontWeight: "bolder", textAlign: "right"}}>
                                    Book ID
                                </TableCell>
                                <TableCell style={{color: "#ffffff", fontWeight: "bolder", textAlign: "right"}}>
                                    Book Title
                                </TableCell>
                                <TableCell style={{color: "#ffffff", fontWeight: "bolder", textAlign: "right"}}>
                                    Book Author
                                </TableCell>
                                <TableCell style={{color: "#ffffff", fontWeight: "bolder", textAlign: "right"}}>
                                    Book Price
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookList.map((book) => (
                                <TableRow
                                    onClick={(e) => {
                                        bookIDChange(book.bookID);
                                        booleanTYpeChange(true);
                                        bookTitleChange(book.bookTitle);
                                        bookPriceChange(book.bookPrice);
                                        bookAuthorChange(book.bookAuthor);
                                    }}
                                    key={book.bookID}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell align="right">{book.bookID}</TableCell>
                                    <TableCell align="right">{book.bookTitle}</TableCell>
                                    <TableCell align="right">{book.bookAuthor}</TableCell>
                                    <TableCell align="right">{book.bookPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
};

export default DriverForm;
