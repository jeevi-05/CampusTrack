package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.lostFoundApplication.bean.LostfoundUser;

public interface LostfoundUserRepository extends JpaRepository<LostfoundUser, String> {
   @Query("SELECT a from LostfoundUser a where a.role='Student'")
   public List<LostfoundUser> getAllStudents();
   
   // Allow lookup by email for login using either username or email
   public java.util.Optional<LostfoundUser> findByEmail(String email);
}
