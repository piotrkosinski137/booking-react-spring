package com.project.usecase;

import com.project.domain.Reservation;
import com.project.domain.TimeFrame;
import com.project.usecase.gateway.GuestGateway;
import com.project.usecase.gateway.OfferGateway;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CreateReservation {

  private final GuestGateway guestGateway;
  private final OfferGateway offerGateway;

  public CreateReservation(GuestGateway guestGateway,
      OfferGateway offerGateway) {
    this.guestGateway = guestGateway;
    this.offerGateway = offerGateway;
  }

  @Transactional
  public void create(Reservation reservation, String username) {
    guestGateway.findBy(username).addReservation(reservation);
    offerGateway.findBy(reservation.getOfferId())
        .addTimeFrame(TimeFrame.from(reservation.getFrom(), reservation.getTo()));
  }
}
