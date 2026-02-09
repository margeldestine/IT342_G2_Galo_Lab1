package galo.userauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // disable CSRF for H2 console
                .headers().frameOptions().disable() // allow H2 console in frames
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/h2-console/**").permitAll() // allow H2 console
                .anyRequest().authenticated() // protect other endpoints
                .and()
                .formLogin(); // default login form

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
