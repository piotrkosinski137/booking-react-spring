package com.project.gateway;

import com.project.domain.Host;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface HostRepository extends JpaRepository<Host, Integer> {

  Optional<Host> findByUsername(String username);
}
