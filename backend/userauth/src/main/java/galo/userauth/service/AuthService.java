package galo.userauth.service;

import galo.userauth.dto.*;
import galo.userauth.model.User;
import galo.userauth.repository.UserRepository;
import galo.userauth.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    public User register(RegisterRequest req) throws Exception {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new Exception("Username '" + req.getUsername() + "' is already taken.");
        }

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new Exception("Email is already registered.");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setFirstname(req.getFirstname());
        user.setLastname(req.getLastname());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponse authenticate(LoginRequest req) throws Exception {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new Exception("Invalid email or password."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new Exception("Invalid email or password.");
        }

        String token = jwtProvider.generateToken(user);
        return new LoginResponse(token);
    }

    public void logout(Long userId) {
    }
}