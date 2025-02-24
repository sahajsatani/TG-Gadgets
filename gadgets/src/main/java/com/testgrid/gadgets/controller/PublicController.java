package com.testgrid.gadgets.controller;

import com.testgrid.gadgets.entity.User;
import com.testgrid.gadgets.service.AuthService;
import com.testgrid.gadgets.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tg/user")
public class PublicController {
    @Autowired
    UserService userService;
    @Autowired
    AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@RequestBody User user){
        return userService.addUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        return userService.login(user);
    }
    @GetMapping("/getproducts")
    public ResponseEntity<List<Map<String,Object>>> getProducts(){
        return authService.getProducts();
    }
}
