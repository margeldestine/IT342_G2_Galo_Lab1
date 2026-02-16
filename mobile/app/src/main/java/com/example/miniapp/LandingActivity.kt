package com.example.miniapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class LandingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        setContentView(R.layout.activity_landing)

        val btnRegister = findViewById<Button>(R.id.btnGoToRegister)
        val btnLogin = findViewById<Button>(R.id.btnGoToLogin)

        btnRegister.setOnClickListener {
            Log.d("DEBUG_APP", "Register Clicked")
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        btnLogin.setOnClickListener {
            Log.d("DEBUG_APP", "Login Clicked")
            startActivity(Intent(this, MainActivity::class.java))
        }
    }
}