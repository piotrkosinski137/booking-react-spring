package com.project.web;

import static com.project.web.util.DateParser.parseFrom;

import com.project.domain.Coordinates;
import com.project.usecase.CreateReservation;
import com.project.usecase.ManageCityCoordinates;
import com.project.usecase.OfferUseCase;
import com.project.web.dto.OfferDto;
import com.project.web.dto.ReservationDto;
import com.project.web.dto.SearchOffersDto;
import java.io.IOException;
import java.security.Principal;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offer")
public class OfferController {

  private final OfferUseCase offerUseCase;
  private final ManageCityCoordinates manageCityCoordinates;
  private final CreateReservation createReservation;

  public OfferController(OfferUseCase offerUseCase, ManageCityCoordinates manageCityCoordinates,
      CreateReservation createReservation) {
    this.offerUseCase = offerUseCase;
    this.manageCityCoordinates = manageCityCoordinates;
    this.createReservation = createReservation;
  }

  //  @RolesAllowed({"ROLE_HOST"})
  @PostMapping("/create")
  public void createOffer(OfferDto dto, Principal principal) {
    offerUseCase.createOffer(dto.toEntity(), principal.getName());
  }

  @GetMapping
  public SearchOffersDto findOffers(@RequestParam String from, @RequestParam String to,
      @RequestParam(required = false, defaultValue = "London") String city) throws IOException {
    Coordinates coordinates = manageCityCoordinates.by(city);
    return new SearchOffersDto(
        offerUseCase.findOffers(parseFrom(from), parseFrom(to), coordinates.getX(),
            coordinates.getY())
            .stream()
            .map(OfferDto::toDto)
            .collect(Collectors.toList()), coordinates);
  }

  @PostMapping("/reserve")
  public void reserve(@RequestBody ReservationDto dto, Principal principal) {
    createReservation.create(dto.toEntity(), principal.getName());
  }
}
