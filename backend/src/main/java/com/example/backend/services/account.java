package com.example.backend.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class account {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> login(String username, String password_hash, String role) {
        String sql = "SELECT * FROM users WHERE username = ? AND password_hash = ? AND role = ?";
        Map<String, Object> user = null;


        try {
            user = jdbcTemplate.queryForMap(sql, username, password_hash, role);

        } catch (Exception e) {
            System.err.println("Lỗi khi truy vấn database: " + e.getMessage());

        }
        return user;
    }
}