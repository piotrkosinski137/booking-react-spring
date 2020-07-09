package com.project.web.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateParser {

  public static LocalDate parseFrom(String date) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    LocalDateTime parse = LocalDateTime.parse(date, formatter);
    return parse.toLocalDate();
  }
}
