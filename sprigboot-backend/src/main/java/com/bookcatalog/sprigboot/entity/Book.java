package com.bookcatalog.sprigboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name = "book")
public class Book {

    @Id
    private String bookID;

    @Column(name = "book_title",nullable = false, length = 50)
    private String bookTitle;

    @Column(name ="book_author",nullable = false, length = 50)
    private String bookAuthor;

    @Column(nullable = false, length = 30)
    private double bookPrice;
}
