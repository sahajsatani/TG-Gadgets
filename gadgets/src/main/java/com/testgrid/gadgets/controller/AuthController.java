package com.testgrid.gadgets.controller;

import com.testgrid.gadgets.dto.AddToCartRequest;
import com.testgrid.gadgets.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tg/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/addtocart")
    public ResponseEntity<?> addToCart(@RequestHeader("userEmail") String email, @RequestHeader("userPassword") String password, @RequestBody AddToCartRequest request) {
        int productId = request.getProductId();
        return authService.addToCart(email,password,productId);
    }
    @PostMapping("/removefromcart")
    public ResponseEntity<?> removeFromCart(@RequestHeader("userEmail") String email, @RequestHeader("userPassword") String password, @RequestBody AddToCartRequest request) {
        int productId = request.getProductId();
        return authService.removeFromCart(email,password,productId);
    }
    @PostMapping("/cart")
    private ResponseEntity<List<Map<String, Object>>> fetchCart(@RequestHeader("userEmail") String email, @RequestHeader("userPassword") String password){
        return authService.fetchCart(email,password);
    }
    @PostMapping("/clearcart")
    private ResponseEntity<?> clearCart(@RequestHeader("userEmail") String email, @RequestHeader("userPassword") String password){
        return authService.clearCart(email,password);
    }
}
