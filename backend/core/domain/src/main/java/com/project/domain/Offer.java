package com.project.domain;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Offer {

  @Id
  @GeneratedValue
  private int id;

  private String title;
  private int price;

  private Double x;
  private Double y;

  private String image;
  private String description;
  @Transient
  private boolean booked;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<TimeFrame> availability = new HashSet<>();

  public Offer() {
  }

  public Offer(String title, int price, Double x, Double y, String image,
      String description) {
    this.title = title;
    this.price = price;
    this.x = x;
    this.y = y;
    this.image = image;
    this.description = description;
  }

  public void manageIsBookedAt(LocalDate from, LocalDate to) {
    booked = availability.stream().anyMatch(timeFrame -> timeFrame.overlaps(from, to));
  }

  public int getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public int getPrice() {
    return price;
  }

  public Double getX() {
    return x;
  }

  public Double getY() {
    return y;
  }

  public String getImage() {
    return image;
  }

  public String getDescription() {
    return description;
  }

  public boolean isBooked() {
    return booked;
  }

  public void addTimeFrame(TimeFrame timeFrame) {
    availability.add(timeFrame);
  }
}
