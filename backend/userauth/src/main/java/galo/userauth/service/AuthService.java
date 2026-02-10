package galo.userauth.service;

import galo.userauth.model.User;
import galo.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already taken"); // Matches Activity Diagram
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hashes password
        return userRepository.save(user);
    }

    public String authenticate(String email, String password) throws Exception {
        // 1. Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        // 2. Check if the raw password matches the encoded password in DB
        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Login Successful";
        } else {
            throw new Exception("Invalid email or password");
        }
    }
}