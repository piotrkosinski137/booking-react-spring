package com.project.gateway;

import com.project.domain.Guest;
import com.project.usecase.gateway.GuestGateway;
import org.springframework.stereotype.Service;

@Service
public class DbGuestGateway implements GuestGateway {

  private final GuestRepository guestRepository;

  public DbGuestGateway(GuestRepository guestRepository) {
    this.guestRepository = guestRepository;
  }

  @Override
  public void save(Guest guest) {
    guestRepository.save(guest);
  }

  @Override
  public Guest findBy(String username) {
    return guestRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Guest not found"));
  }
}
