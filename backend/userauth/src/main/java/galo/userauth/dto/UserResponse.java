package galo.userauth.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Long user_id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
}