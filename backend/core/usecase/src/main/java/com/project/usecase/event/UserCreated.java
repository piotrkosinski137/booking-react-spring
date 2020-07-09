package com.project.usecase.event;

import org.springframework.context.ApplicationEvent;

public class UserCreated extends ApplicationEvent {

  private final String username;
  private final String role;

  public UserCreated(Object source, String username, String role) {
    super(source);
    this.username = username;
    this.role = role;
  }

  public String getUsername() {
    return username;
  }

  public String getRole() {
    return role;
  }
}
