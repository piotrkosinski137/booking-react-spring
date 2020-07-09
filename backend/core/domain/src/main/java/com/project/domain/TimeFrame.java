package com.project.domain;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TimeFrame {

  @Id
  @GeneratedValue
  private int id;

  private LocalDate from;
  private LocalDate to;

  public TimeFrame() {
  }

  public TimeFrame(LocalDate from, LocalDate to) {
    this.from = from;
    this.to = to;
  }

  public static TimeFrame from(LocalDate from, LocalDate to) {
    return new TimeFrame(from, to);
  }

  public boolean overlaps(LocalDate from, LocalDate to) {
    return from.isAfter(this.from) || to.isBefore(this.to);
  }
}
