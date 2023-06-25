package com.bookcatalog.sprigboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class BookDTO {
    private String bookID;
    private String bookTitle;
    private String bookAuthor;
    private double bookPrice;
}
