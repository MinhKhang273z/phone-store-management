package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // API lấy toàn bộ người dùng
    @GetMapping
    public List<User> getAllUsers() {
        System.out.println("API Called: GET /api/users");
        return userService.getAllUsers();
    }

    // API xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        System.out.println("API Called: DELETE /api/users/" + id);
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
