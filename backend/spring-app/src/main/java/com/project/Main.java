package com.project;

import com.project.auth.controller.AuthenticationController;
import com.project.auth.controller.JwtRegisterRequest;
import com.project.web.OfferController;
import com.project.web.dto.OfferDto;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner {

  private final AuthenticationController auth;
  private final OfferController offerController;

  public Main(AuthenticationController auth, OfferController offerController) {
    this.auth = auth;
    this.offerController = offerController;
  }

  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }

  @Override
  public void run(String... args) {
    auth.register(new JwtRegisterRequest("guest", "guest", "GUEST"));
    String hostId = auth.register(new JwtRegisterRequest("host", "host", "HOST"));
    offerController.createOffer(
        new OfferDto("Cozy flat", 212, 50.3452004, 18.9171822,
            "https://i.wpimg.pl/736x425/extradom.wpcdn.pl/media/292367/source",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur consectetur consequatur consequuntur debitis ducimus, est expedita fugiat itaque molestias necessitatibus neque, quaerat, qui quisquam quos ratione temporibus unde."),
        () -> "host");
    offerController.createOffer(
        new OfferDto("Super flat", 1640, 50.341862, 18.9127919,
            "https://q-cf.bstatic.com/images/hotel/max1024x768/200/200749754.jpg",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur consectetur consequatur consequuntur debitis ducimus, est expedita fugiat itaque molestias necessitatibus neque, quaerat, qui quisquam quos ratione temporibus unde."),
        () -> "host");
    offerController.createOffer(
        new OfferDto("Perfect flat", 799, 50.3423581, 18.9025725,
            "https://i.dobrzemieszkaj.pl/i/31/45/36/r3/1920/wood-core-house-w-dwa-dni-zbuduje-dom-na-4buildings.jpg",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur consectetur consequatur consequuntur debitis ducimus, est expedita fugiat itaque molestias necessitatibus neque, quaerat, qui quisquam quos ratione temporibus unde."),
        () -> "host");
    offerController.createOffer(
        new OfferDto("Perfect flat", 222, 50.2806954, 19.0071471,
            "https://i.dobrzemieszkaj.pl/i/31/45/36/r3/1920/wood-core-house-w-dwa-dni-zbuduje-dom-na-4buildings.jpg",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur consectetur consequatur consequuntur debitis ducimus, est expedita fugiat itaque molestias necessitatibus neque, quaerat, qui quisquam quos ratione temporibus unde."),
        () -> "host");
  }
}
