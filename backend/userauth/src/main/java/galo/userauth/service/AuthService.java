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

    public String authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return "Login Successful"; // Create session logic
        }
        throw new RuntimeException("Invalid credentials");
    }
}