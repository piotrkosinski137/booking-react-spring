package com.project.web.dto;

import com.project.domain.Offer;

public class OfferDto {

  private Integer id;
  private String title;
  private int price;

  private Double x;
  private Double y;

  private String image;
  private String description;
  private boolean booked;

  public OfferDto() {
  }

  public OfferDto(int id, String title, int price, Double x, Double y, String image,
      String description, boolean booked) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.x = x;
    this.y = y;
    this.image = image;
    this.description = description;
    this.booked = booked;
  }

  public OfferDto(String title, int price, Double x, Double y, String image,
      String description) {
    this.title = title;
    this.price = price;
    this.x = x;
    this.y = y;
    this.image = image;
    this.description = description;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public Double getX() {
    return x;
  }

  public void setX(Double x) {
    this.x = x;
  }

  public Double getY() {
    return y;
  }

  public void setY(Double y) {
    this.y = y;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public boolean isBooked() {
    return booked;
  }

  public void setBooked(boolean booked) {
    this.booked = booked;
  }

  public Offer toEntity() {
    return new Offer(title, price, x, y, image, description);
  }

  public static OfferDto toDto(Offer offer) {
    return new OfferDto(offer.getId(), offer.getTitle(), offer.getPrice(), offer.getX(), offer.getY(), offer.getImage(), offer.getDescription(), offer.isBooked());
  }
}
