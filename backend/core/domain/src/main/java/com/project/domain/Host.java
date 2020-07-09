package com.project.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Host {

  @Id
  @GeneratedValue
  private int id;
  private String username;
  private String name = "Piotr Host";
  private String image;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Offer> offers = new HashSet<>();

  public Host() {
  }

  public Host(String username) {
    this.username = username;
  }

  public void addOffer(Offer offer) {
    offers.add(offer);
  }
}
