package com.project.usecase;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Coordinates;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ManageCityCoordinates {

  private RestTemplate restTemplate = new RestTemplate();
  private static String URL = "https://geocode.xyz/";
  private static String API_KEY = "174361998562676693554x6566";

   public Coordinates by(String city) throws IOException {
     ResponseEntity<String> response = restTemplate.getForEntity(URL + city + "?json=1&auth=" + API_KEY, String.class);

     ObjectMapper mapper = new ObjectMapper();
     JsonNode root = mapper.readTree(response.getBody());
     String x = root.path("latt").asText();
     String y = root.path("longt").asText();

    return new Coordinates(Double.parseDouble(x), Double.parseDouble(y));
  }

}
