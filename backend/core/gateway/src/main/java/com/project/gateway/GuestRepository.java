package com.project.gateway;

import com.project.domain.Guest;
import com.project.domain.Host;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface GuestRepository extends JpaRepository<Guest, Integer> {

  Optional<Guest> findByUsername(String username);
}
