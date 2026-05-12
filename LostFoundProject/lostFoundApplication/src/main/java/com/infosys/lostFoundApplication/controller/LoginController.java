package com.infosys.lostFoundApplication.controller;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.infosys.lostFoundApplication.bean.LostfoundUser;
import com.infosys.lostFoundApplication.dao.LostfoundUserRepository;
import com.infosys.lostFoundApplication.service.LostfoundUserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") 
public class LoginController {

    @Autowired
    private LostfoundUserService service;
    
    @Autowired
    private LostfoundUserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Encode passwords

    // -------------------- Register User --------------------
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LostfoundUser user) {
        try {
            // Encrypt password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            service.save(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Registration failed: " + ex.getMessage());
        }
    }

    // -------------------- Login User --------------------
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String password = credentials.get("password");
        String role = "false";

        try {
            // Load user from database
            LostfoundUser user = (LostfoundUser) service.loadUserByUsername(userId);

            // Check password using PasswordEncoder
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.status(401).body("Invalid credentials");
            }

            // Set authentication manually
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userId, null, user.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            role = user.getRole();

        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(role);
    }

    // -------------------- Logout User --------------------
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Clear Spring Security context
        SecurityContextHolder.clearContext();

        // Invalidate session
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();

        // Delete JSESSIONID cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful");
    }

    // -------------------- Get User Details --------------------
    @GetMapping("/login")
    public LostfoundUser getUserDetails() {
        return service.getUser();
    }

    @GetMapping("/user")
    public String getUserId() {
        return service.getUserId();
    }

    @GetMapping("/role")
    public String getRole() {
        return service.getRole();
    }
    //---Get List of Students----
    @GetMapping("/students")
    public List<LostfoundUser> getAllStudents(){
    	return service.getAllStudents();
    }
    @DeleteMapping("/admin/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {

        if (!"admin".equalsIgnoreCase(service.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Only admin can delete users");
        }

        try {
            repository.deleteById(username);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Error deleting user: " + ex.getMessage());
        }
    }
 // -------------------- ADMIN: GET ALL USERS --------------------
    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUsers() {

        // Only allow admin
        if (!"admin".equalsIgnoreCase(service.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Only admin can view all users");
        }

        return ResponseEntity.ok(repository.findAll());
    }
}
