package com.example.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class account {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Map<String, Object> login(String id, String matkhau) {
    String sql = "SELECT * FROM users WHERE username = ? AND password_hash = ?";
    try {
      return jdbcTemplate.queryForMap(sql, id, matkhau);
    } catch (Exception e) {
      return null;
    }
  }}

