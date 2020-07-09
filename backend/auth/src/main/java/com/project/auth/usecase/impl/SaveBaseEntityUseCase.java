package com.project.auth.usecase.impl;


import com.project.auth.domain.BaseEntity;
import com.project.auth.usecase.SaveBaseEntity;
import com.project.usecase.event.UserCreated;
import com.project.auth.usecase.gateway.BaseEntityCommandGateway;
import com.project.auth.usecase.gateway.BaseEntityQueryGateway;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class SaveBaseEntityUseCase implements SaveBaseEntity {

  private final BaseEntityCommandGateway command;
  private final BaseEntityQueryGateway query;
  private final ApplicationEventPublisher publisher;

  public SaveBaseEntityUseCase(BaseEntityCommandGateway command,
      BaseEntityQueryGateway query, ApplicationEventPublisher publisher) {
    this.command = command;
    this.query = query;
    this.publisher = publisher;
  }

  @Override
  public String save(BaseEntity baseEntity) {
    if (query.loadByUsername(baseEntity.getUsername()).isPresent()) {
      throw new RuntimeException("Email already exists inside db");
    }
    String id = command.save(baseEntity);
    publisher.publishEvent(new UserCreated(this, baseEntity.getUsername(), baseEntity.getRole().name()));
    return id;
  }
}
