package com.bookcatalog.sprigboot.service;

import com.bookcatalog.sprigboot.dto.BookDTO;

import java.util.List;

public interface BookService {
    void saveBook(BookDTO bookDTO);

    void updateBook(BookDTO bookDTO);

    void deleteBook(String code);

    BookDTO searchBook(String id);

    List<BookDTO> getAllBooks();
}
