package com.example.miniapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val btnDashboard = findViewById<Button>(R.id.btnDashboard)
        val btnLogout = findViewById<Button>(R.id.btnLogout)
        val token = intent.getStringExtra("accessToken") ?: ""

        if (token.isNotEmpty()) fetchUserProfile(token)

        btnDashboard.setOnClickListener { finish() }
        btnLogout.setOnClickListener { showLogoutDialog() }
    }

    private fun showLogoutDialog() {
        val view = layoutInflater.inflate(R.layout.dialog_logout, null)
        val dialog = AlertDialog.Builder(this).setView(view).create()
        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)

        view.findViewById<Button>(R.id.btnCancelModal).setOnClickListener { dialog.dismiss() }
        view.findViewById<Button>(R.id.btnConfirmModal).setOnClickListener {
            dialog.dismiss()
            val intent = Intent(this, LandingActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            finish()
        }
        dialog.show()
    }

    private fun fetchUserProfile(token: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val apiService = RetrofitClient.instance.create(AuthService::class.java)
                val response = apiService.getUserProfile("Bearer $token")
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful && response.body() != null) {
                        val user = response.body()!!
                        findViewById<TextView>(R.id.tvProfileUsername).text = user.username
                        findViewById<TextView>(R.id.tvProfileEmail).text = user.email
                        findViewById<TextView>(R.id.tvProfileFirstName).text = user.firstname
                        findViewById<TextView>(R.id.tvProfileLastName).text = user.lastname
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ProfileActivity, "Error loading data", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}