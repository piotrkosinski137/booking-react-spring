package com.project.auth.controller;

import java.io.Serializable;

public class JwtRegisterRequest implements Serializable {

  private static final long serialVersionUID = -8445943548965154778L;

  private String email;
  private String password;
  private String type;

  private JwtRegisterRequest() {
  }

  public JwtRegisterRequest(String email, String password, String type) {
    this.email = email;
    this.password = password;
    this.type = type;
  }

  String getEmail() {
    return this.email;
  }

  String getPassword() {
    return this.password;
  }

  void setEmail(String email) {
    this.email = email;
  }

  void setPassword(String password) {
    this.password = password;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
}
