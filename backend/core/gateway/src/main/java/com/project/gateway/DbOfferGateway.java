package com.project.gateway;

import com.project.domain.Offer;
import com.project.usecase.gateway.OfferGateway;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DbOfferGateway implements OfferGateway {

  private final OfferRepository offerRepository;

  public DbOfferGateway(OfferRepository offerRepository) {
    this.offerRepository = offerRepository;
  }

  @Override
  public List<Offer> findBy(double x, double y) {
    return offerRepository.findInArea(x, y);
  }

  @Override
  public Offer findBy(int offerId) {
    return offerRepository.findById(offerId)
        .orElseThrow(() -> new RuntimeException("Offer not found"));
  }
}
