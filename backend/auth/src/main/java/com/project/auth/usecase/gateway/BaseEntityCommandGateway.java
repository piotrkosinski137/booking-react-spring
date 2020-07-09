package com.project.auth.usecase.gateway;


import com.project.auth.domain.BaseEntity;

public interface BaseEntityCommandGateway {

  String save(BaseEntity baseEntity);
}
