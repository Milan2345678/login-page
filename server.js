const express = require('express');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error:", err));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/register', async (req, res) => {
  console.log("Received registration data:", req.body);
    const { username, password } = req.body;
    
    const newUser = new User({ username, password });
    await newUser.save();
res.send(`
<script>
alert("User registered successfully");
window.location.href="/";
</script>
`);}); 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});