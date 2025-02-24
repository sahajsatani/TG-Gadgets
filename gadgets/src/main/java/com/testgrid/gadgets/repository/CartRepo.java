package com.testgrid.gadgets.repository;

import com.testgrid.gadgets.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    @Query(value = "SELECT * FROM tblcart WHERE cart_id in (SELECT cart_id FROM user_cart WHERE user_id = ?1)",nativeQuery = true)
    List<Cart> findUserCartById(int userId);
}
