package galo.userauth.controller;

import galo.userauth.dto.UserResponse;
import galo.userauth.model.User;
import galo.userauth.repository.UserRepository;
import galo.userauth.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (token != null && jwtProvider.validateToken(token)) {
            String email = jwtProvider.getEmailFromToken(token);
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                UserResponse res = new UserResponse();
                res.setUser_id(user.getUser_id());
                res.setUsername(user.getUsername());
                res.setEmail(user.getEmail());
                res.setFirstname(user.getFirstname());
                res.setLastname(user.getLastname());

                return ResponseEntity.ok(res);
            }
        }

        return ResponseEntity.status(401).body("Unauthorized");
    }
}