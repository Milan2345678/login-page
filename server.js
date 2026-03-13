require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


// REGISTER ROUTE
app.post('/register', async (req, res) => {

  try {

    console.log("Received registration data:", req.body);

    const { username, password } = req.body;

    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.send(`
      <script>
        alert("User registered successfully!");
        window.location.href="/";
      </script>
    `);

  } catch (error) {

    console.log(error);

    res.send(`
      <script>
        alert("Error registering user");
        window.location.href="/";
      </script>
    `);

  }

});


// START SERVER
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});