package com.project.gateway;

import com.project.domain.Offer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface OfferRepository extends JpaRepository<Offer, Integer> {

  @Query("SELECT o FROM Offer o where (o.x - ?1) BETWEEN -0.1 AND 0.1 AND (o.y - ?2) BETWEEN -0.1 AND 0.1 ORDER BY o.price ASC")
  List<Offer> findInArea(double x, double y);
}
