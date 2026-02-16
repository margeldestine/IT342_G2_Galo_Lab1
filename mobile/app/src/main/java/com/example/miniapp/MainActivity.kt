package com.example.miniapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val tvGoToRegister = findViewById<TextView>(R.id.tvGoToRegister)

        tvGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        btnLogin.setOnClickListener {
            val email = etEmail.text.toString()
            val password = etPassword.text.toString()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please enter all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val request = LoginRequest(email, password)

            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val apiService = RetrofitClient.instance.create(AuthService::class.java)
                    val response = apiService.login(request)

                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful && response.body() != null) {
                            val intent = Intent(this@MainActivity, DashboardActivity::class.java)
                            intent.putExtra("accessToken", response.body()!!.accessToken)
                            startActivity(intent)
                            finish()
                        } else {
                            Toast.makeText(this@MainActivity, "Invalid Credentials", Toast.LENGTH_SHORT).show()
                        }
                    }
                } catch (e: Exception) {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@MainActivity, "Connection Error", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }
}