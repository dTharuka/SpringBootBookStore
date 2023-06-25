package com.bookcatalog.sprigboot.service.impl;

import com.bookcatalog.sprigboot.dto.BookDTO;
import com.bookcatalog.sprigboot.entity.Book;
import com.bookcatalog.sprigboot.repo.BookRepo;
import com.bookcatalog.sprigboot.service.BookService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class BokServiceImpl implements BookService {

    @Autowired
    BookRepo bookRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void saveBook(BookDTO bookDTO) {
        if (bookRepo.existsById(bookDTO.getBookID())) {
            throw new RuntimeException("Book Already Exists!");
        } else {
            bookRepo.save(modelMapper.map(bookDTO, Book.class));
        }
    }

    @Override
    public void updateBook(BookDTO bookDTO) {
        if (bookRepo.existsById(bookDTO.getBookID())) {
            bookRepo.save(modelMapper.map(bookDTO, Book.class));
        } else {
            throw new RuntimeException("cannot find this kind of id");
        }
    }

    @Override
    public void deleteBook(String code) {
        if (bookRepo.existsById(code)) {
            bookRepo.deleteById(code);
        } else {
            throw new RuntimeException("No Such a Book");
        }
    }

    @Override
    public BookDTO searchBook(String id) {
        if (bookRepo.existsById(id)) {
            return modelMapper.map(bookRepo.findById(id).get(), BookDTO.class);
        } else {
            throw new RuntimeException("No such a book in this id " + id);
        }
    }

    @Override
    public List<BookDTO> getAllBooks() {
        return modelMapper.map(bookRepo.findAll(), new TypeToken<ArrayList<BookDTO>>() {
        }.getType());
    }
}
