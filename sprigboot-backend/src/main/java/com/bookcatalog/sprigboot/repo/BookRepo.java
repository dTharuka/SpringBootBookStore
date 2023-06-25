package com.bookcatalog.sprigboot.repo;

import com.bookcatalog.sprigboot.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends JpaRepository<Book,String> {}
