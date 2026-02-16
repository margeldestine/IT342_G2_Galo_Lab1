package com.example.miniapp

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val tvGoToLogin = findViewById<TextView>(R.id.tvGoToLogin)
        val tvErrorBox = findViewById<TextView>(R.id.tvErrorBox)

        tvGoToLogin.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        btnRegister.setOnClickListener {
            tvErrorBox.visibility = View.GONE

            val username = findViewById<EditText>(R.id.etUsername).text.toString()
            val firstname = findViewById<EditText>(R.id.etFirstname).text.toString()
            val lastname = findViewById<EditText>(R.id.etLastname).text.toString()
            val email = findViewById<EditText>(R.id.etEmail).text.toString()
            val password = findViewById<EditText>(R.id.etPassword).text.toString()

            if (email.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                tvErrorBox.text = "Please include an '@' in the email address. '$email' is invalid."
                tvErrorBox.visibility = View.VISIBLE
                return@setOnClickListener
            }

            val requirements = mutableListOf<String>()
            if (password.length < 8) requirements.add("at least 8 characters")
            if (!password.contains(Regex("[0-9]"))) requirements.add("at least one number")
            if (!password.contains(Regex("[!@#$%^&*]"))) requirements.add("at least one special character")

            if (requirements.isNotEmpty()) {
                var message = "Password must have "
                when (requirements.size) {
                    1 -> message += requirements[0]
                    2 -> message += "${requirements[0]} and ${requirements[1]}"
                    else -> {
                        val allButLast = requirements.dropLast(1).joinToString(", ")
                        message += "$allButLast, and ${requirements.last()}"
                    }
                }
                tvErrorBox.text = "$message."
                tvErrorBox.visibility = View.VISIBLE
                return@setOnClickListener
            }

            val request = RegisterRequest(username, email, password, firstname, lastname)

            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val apiService = RetrofitClient.instance.create(AuthService::class.java)
                    val response = apiService.register(request)

                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful) {
                            Toast.makeText(this@RegisterActivity, "Registration Successful!", Toast.LENGTH_SHORT).show()

                            val intent = Intent(this@RegisterActivity, MainActivity::class.java)
                            startActivity(intent)
                            finish()
                        } else {
                            val errorJson = response.errorBody()?.string()
                            val serverMessage = try {
                                if (errorJson != null) {
                                    JSONObject(errorJson).getString("message")
                                } else "Registration failed."
                            } catch (e: Exception) {
                                "Registration failed. Please try again."
                            }

                            tvErrorBox.text = serverMessage
                            tvErrorBox.visibility = View.VISIBLE
                        }
                    }
                } catch (e: Exception) {
                    withContext(Dispatchers.Main) {
                        tvErrorBox.text = "Connection Error: Could not reach server."
                        tvErrorBox.visibility = View.VISIBLE
                    }
                }
            }
        }
    }
}