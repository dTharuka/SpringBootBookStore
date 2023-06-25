package com.bookcatalog.sprigboot.controller;

import com.bookcatalog.sprigboot.dto.BookDTO;
import com.bookcatalog.sprigboot.service.BookService;
import com.bookcatalog.sprigboot.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/book/")
public class BooksController {

    @Autowired
    private BookService bookService;

    // http://localhost:8080/api/v1/book/get-all-books
    @GetMapping("get-all-books")
    public ResponseUtil getAllBooks() {
        return new ResponseUtil("OK", "Success!", bookService.getAllBooks());
    }

    // http://localhost:8080/api/v1/book/save-book
    @PostMapping(value = "save-book", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil createBook(@RequestBody BookDTO bookDTO) {
        bookService.saveBook(bookDTO);
        return new ResponseUtil("OK", "Successfully Registered!", bookDTO);
    }

    // http://localhost:8080/api/v1/book/update-book
    @PutMapping("update-book")
    public ResponseUtil updateBook(@RequestBody BookDTO bookDTO) {
        bookService.updateBook(bookDTO);
        return new ResponseUtil("OK", "Update Success!", bookDTO);
    }

    // http://localhost:8080/api/v1/book/delete-book/2
    @DeleteMapping("delete-book/{id}")
    public ResponseUtil deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return new ResponseUtil("OK", "Deleted!", id);
    }

    // http://localhost:8080/api/v1/book/search/{id}
    @GetMapping(value = "search/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchBookById(@PathVariable String id) {
        BookDTO bookDTO = bookService.searchBook(id);
        return new ResponseUtil("OK", "Found", bookDTO);
    }

}
