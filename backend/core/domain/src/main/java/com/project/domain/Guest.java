package com.project.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Guest {

  @Id
  @GeneratedValue
  private int id;
  private String username = "Piotr Guest";
  private String name;
  private String image;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Reservation> reservations = new HashSet<>();

  public Guest() {
  }

  public Guest(String username) {
    this.username = username;
  }

  public void addReservation(Reservation reservation) {
    reservations.add(reservation);
  }
}
