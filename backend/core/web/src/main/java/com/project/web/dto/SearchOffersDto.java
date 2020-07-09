package com.project.web.dto;

import com.project.domain.Coordinates;
import java.util.Collection;
import java.util.List;

public class SearchOffersDto {
  private Collection<OfferDto> offers;
  private Coordinates coordinates;

  public SearchOffersDto() {
  }

  public SearchOffersDto(List<OfferDto> offers, Coordinates coordinates) {
    this.offers = offers;
    this.coordinates = coordinates;
  }

  public Collection<OfferDto> getOffers() {
    return offers;
  }

  public void setOffers(List<OfferDto> offers) {
    this.offers = offers;
  }

  public Coordinates getCoordinates() {
    return coordinates;
  }

  public void setCoordinates(Coordinates coordinates) {
    this.coordinates = coordinates;
  }
}
