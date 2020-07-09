package com.project.web.dto;

import static java.time.LocalDate.parse;

import com.project.domain.Reservation;

public class ReservationDto {

  private int id;
  private int offerId;
  private String from;
  private String to;
  private int total;

  public ReservationDto() {
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getOfferId() {
    return offerId;
  }

  public void setOfferId(int offerId) {
    this.offerId = offerId;
  }

  public String getFrom() {
    return from;
  }

  public void setFrom(String from) {
    this.from = from;
  }

  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    this.to = to;
  }

  public int getTotal() {
    return total;
  }

  public void setTotal(int total) {
    this.total = total;
  }

  public Reservation toEntity() {
    return new Reservation(offerId, parse(from), parse(to), total);
  }
}
