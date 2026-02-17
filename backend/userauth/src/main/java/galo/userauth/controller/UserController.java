package galo.userauth.controller;

import galo.userauth.dto.UserResponse;
import galo.userauth.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<?> me() {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user != null) {
            UserResponse res = new UserResponse();
            res.setUser_id(user.getUser_id());
            res.setUsername(user.getUsername());
            res.setEmail(user.getEmail());
            res.setFirstname(user.getFirstname());
            res.setLastname(user.getLastname());

            return ResponseEntity.ok(res);
        }

        return ResponseEntity.status(401).body("Unauthorized");
    }
}