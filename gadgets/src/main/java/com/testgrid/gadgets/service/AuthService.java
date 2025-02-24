package com.testgrid.gadgets.service;

import com.testgrid.gadgets.entity.Cart;
import com.testgrid.gadgets.entity.User;
import com.testgrid.gadgets.repository.CartRepo;
import com.testgrid.gadgets.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {
    @Autowired
    CartRepo cartRepo;
    @Autowired
    UserRepo userRepo;
    public ResponseEntity<List<Map<String,Object>>> getProducts() {
        try{
                List<Map<String, Object>> response = cartRepo.findAll().stream()
                        .map(product -> {
                            Map<String, Object> productMap = new HashMap<>();
                            productMap.put("id", product.getCartId());
                            productMap.put("title", product.getTitle());
                            productMap.put("description", product.getDescription());
                            productMap.put("price", product.getPrice());
                            productMap.put("imgSrc", product.getImgSrc());
                            productMap.put("category", product.getCategory());
                            return productMap;
                        })
                        .toList();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    public ResponseEntity<?> addToCart(String email, String password, int productId) {
        try{
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getPassword().equals(password) && productId>0){
                Cart cart = cartRepo.findById(productId).get();
                if(cart!=null){
                    user.getCarts().add(cart);
                    userRepo.save(user);
                    return new ResponseEntity<>(HttpStatus.OK);
                }else{
                    return new ResponseEntity<>("Not product found",HttpStatus.NOT_FOUND);
                }
            }else
                return new ResponseEntity<>("Not user found",HttpStatus.NOT_FOUND);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    public ResponseEntity<?> removeFromCart(String email, String password, int productId) {
        try{
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getPassword().equals(password) && productId>0){
                Cart cart = cartRepo.findById(productId).get();
                if(cart!=null){
                    user.getCarts().remove(cart);
                    userRepo.save(user);
                    return new ResponseEntity<>(HttpStatus.OK);
                }else{
                    return new ResponseEntity<>("Not product found",HttpStatus.NOT_FOUND);
                }
            }else
                return new ResponseEntity<>("Not user found",HttpStatus.NOT_FOUND);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<List<Map<String, Object>>> fetchCart(String email, String password) {
        try{
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getPassword().equals(password)){
                List<Map<String, Object>> response = cartRepo.findUserCartById(user.getUserId()).stream()
                        .map(product -> {
                            Map<String, Object> productMap = new HashMap<>();
                            productMap.put("id", product.getCartId());
                            productMap.put("title", product.getTitle());
                            productMap.put("description", product.getDescription());
                            productMap.put("price", product.getPrice());
                            productMap.put("imgSrc", product.getImgSrc());
                            productMap.put("category", product.getCategory());
                            return productMap;
                        })
                        .toList();
                return new ResponseEntity<>(response,HttpStatus.OK);
            }else
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    public ResponseEntity<?> clearCart(String email, String password) {
        try{
            User user = userRepo.findByEmail(email);
            if(user!=null && user.getPassword().equals(password)){
                user.getCarts().clear();
                userRepo.save(user);
                return new ResponseEntity<>(true,HttpStatus.OK);
            }else
                return new ResponseEntity<>(false,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
