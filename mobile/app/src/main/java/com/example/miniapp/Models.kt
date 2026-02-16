package com.example.miniapp

data class User(
    val user_id: Long,
    val username: String,
    val email: String,
    val firstname: String,
    val lastname: String
)

data class LoginResponse(val accessToken: String)

data class RegisterRequest(val username: String, val email: String, val password: String, val firstname: String, val lastname: String)
data class LoginRequest(val email: String, val password: String)
data class ApiResponse(val success: Boolean, val message: String)
