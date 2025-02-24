package com.testgrid.gadgets.service;

import com.testgrid.gadgets.entity.Cart;
import com.testgrid.gadgets.entity.User;
import com.testgrid.gadgets.repository.CartRepo;
import com.testgrid.gadgets.repository.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class StartUpTask {
    @Autowired
    CartRepo cartRepo;
    @Autowired
    UserRepo userRepo;
    @PostConstruct
    public void init(){
        List<Cart> cartItems = Arrays.asList(
                new Cart("mobiles", "Apple iPhone 14", "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg", "Apple iPhone 14 (128 GB) - Blue", 1080),
                new Cart("laptops", "Xiaomi [Smartchoice] Notebookpro", "https://m.media-amazon.com/images/I/71iiXU7HHkL._SL1500_.jpg", "Xiaomi [Smartchoice] Notebookpro", 600),
                new Cart("tablets", "Xiaomi Pad 6", "https://m.media-amazon.com/images/I/61N1RFGVVCL._SL1500_.jpg", "Xiaomi Pad 6| Qualcomm Snapdragon 870|", 360),
                new Cart("mobiles", "Apple iPhone 11", "https://m.media-amazon.com/images/I/61VuVU94RnL._SL1500_.jpg", "Apple iPhone 11 (64GB) - White", 960),
                new Cart("tablets", "Lenovo Tab P12 Pro AMOLED", "https://m.media-amazon.com/images/I/51UyQtd1KRL._SL1001_.jpg", "Lenovo Tab P12 Pro AMOLED (12.6 inch, 8GB, 256GB, Wi-Fi Only), Storm Grey with Precision Pen 3", 240),
                new Cart("mobiles", "Apple iPhone 13", "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg", "Apple iPhone 13 (128GB) - Blue", 840),
                new Cart("laptops", "Lenovo IdeaPad Slim 5", "https://m.media-amazon.com/images/I/81PuoXg49EL._SL1500_.jpg", "Lenovo IdeaPad Slim 5 Intel Core i5 12450H 14 inch (35.5cm)", 360),
                new Cart("tablets", "Samsung Galaxy Tab A8", "https://m.media-amazon.com/images/I/61J1NUF2sKL._SL1500_.jpg", "Samsung Galaxy Tab A8 26.69cm (10.5 inch) Display, RAM 4 GB, ROM 64 GB Expandable, Wi-Fi Tablet, Gray", 600),
                new Cart("laptops", "Apple MacBook Air Laptop", "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg", "Apple MacBook Air Laptop M1 chip, 13.3-inch Retina Display", 1080)
        );
        cartRepo.saveAll(cartItems);
        User user1 = new User();
        user1.setUsername("sahaj");
        user1.setEmail("sahaj1032@gmail.com");
        user1.setPassword("sahaj");
        User user2 = new User();
        user2.setUsername("jake");
        user2.setEmail("jake@gmail.com");
        user2.setPassword("jake");
        userRepo.save(user1);
        userRepo.save(user2);
    }
}
