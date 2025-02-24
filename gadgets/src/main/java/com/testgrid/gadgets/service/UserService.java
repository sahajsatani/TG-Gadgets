package com.testgrid.gadgets.service;

import com.testgrid.gadgets.entity.User;
import com.testgrid.gadgets.repository.CartRepo;
import com.testgrid.gadgets.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    CartRepo cartRepo;
    @Transactional
    public ResponseEntity<?> addUser(User user) {
        try{
            if(userRepo.save(user)!=null){
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    public ResponseEntity<?> login(User user) {
        try{
            User dbuser = userRepo.findByEmail(user.getEmail());
            if(dbuser != null && user.getEmail().equals(dbuser.getEmail()) && user.getPassword().equals(dbuser.getPassword())){
                return new ResponseEntity<>(HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
