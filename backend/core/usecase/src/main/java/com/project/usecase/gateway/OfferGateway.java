package com.project.usecase.gateway;

import com.project.domain.Offer;
import java.util.List;

public interface OfferGateway {

  List<Offer> findBy(double x, double y);
  Offer findBy(int offerId);
}
