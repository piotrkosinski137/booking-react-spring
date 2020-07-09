package com.project.usecase.gateway;

import com.project.domain.Guest;

public interface GuestGateway {
  void save(Guest guest);
  Guest findBy(String username);
}
