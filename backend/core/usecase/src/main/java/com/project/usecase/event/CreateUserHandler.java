package com.project.usecase.event;

import com.project.domain.Guest;
import com.project.domain.Host;
import com.project.usecase.gateway.GuestGateway;
import com.project.usecase.gateway.HostGateway;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class CreateUserHandler {

  private final HostGateway hostGateway;
  private final GuestGateway guestGateway;

  public CreateUserHandler(HostGateway hostGateway, GuestGateway guestGateway) {
    this.hostGateway = hostGateway;
    this.guestGateway = guestGateway;
  }

  @EventListener
  public void handleUserCreation(UserCreated userCreated) {
    if (userCreated.getRole().equals("HOST")) {
      hostGateway.save(new Host(userCreated.getUsername()));
    } else {
      guestGateway.save(new Guest(userCreated.getUsername()));
    }
  }
}
