const express  = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User",userSchema);

app.post("/users",async(req,res) => {
    try{
        const {name,email,age} = req.body;
        const newUser = new User({ name,email,age});
        await newUser.save();
        res.status(201).json({message: "User Saved successfully"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.get("/users/details", async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

app.listen(PORT, () =>{
    console.log(`Server running on port${PORT}`);
});