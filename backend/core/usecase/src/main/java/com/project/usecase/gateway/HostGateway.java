package com.project.usecase.gateway;

import com.project.domain.Host;

public interface HostGateway {

  void save(Host host);

  Host findBy(String username);
}
