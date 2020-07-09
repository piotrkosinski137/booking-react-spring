package com.project.usecase;

import com.project.domain.Offer;
import com.project.usecase.gateway.HostGateway;
import com.project.usecase.gateway.OfferGateway;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class OfferUseCase {

  private final HostGateway hostGateway;
  private final OfferGateway offerGateway;


  public OfferUseCase(HostGateway hostGateway, OfferGateway offerGateway) {
    this.hostGateway = hostGateway;
    this.offerGateway = offerGateway;
  }

  @Transactional
  public void createOffer(Offer offer, String username) {
    hostGateway.findBy(username).addOffer(offer);
  }

  public Set<Offer> findOffers(LocalDate from, LocalDate to, double x, double y) {
    return offerGateway.findBy(x, y).stream()
        .map(offer -> {
          offer.manageIsBookedAt(from, to);
          return offer;
        })
        .collect(Collectors.toSet());
  }
}
