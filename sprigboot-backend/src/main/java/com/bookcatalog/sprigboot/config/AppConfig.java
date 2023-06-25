package com.bookcatalog.sprigboot.config;

import com.bookcatalog.sprigboot.service.BookService;
import com.bookcatalog.sprigboot.service.impl.BokServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = {BokServiceImpl.class})
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
