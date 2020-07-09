package com.project.gateway;

import com.project.domain.Host;
import com.project.usecase.gateway.HostGateway;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class DbHostGateway implements HostGateway {

  private final HostRepository hostRepository;

  public DbHostGateway(HostRepository hostRepository) {
    this.hostRepository = hostRepository;
  }

  @Override
  public void save(Host host) {
    hostRepository.save(host);
  }

  @Override
  public Host findBy(String username) {
    return hostRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Host not found"));
  }
}
