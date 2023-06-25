package com.bookcatalog.sprigboot.exception;

import com.bookcatalog.sprigboot.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MyExceptionHandler {
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseUtil handleException(Exception exception) {
        return new ResponseUtil("Error", exception.getMessage(), "");
    }
}
