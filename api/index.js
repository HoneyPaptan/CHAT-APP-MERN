const express = require("express")
const mongoose = require("mongoose")
const app = express()
const User = require("./models/userModel")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const dotenv  = require("dotenv")
const validator = require("validator")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
dotenv.config()

// connecting to db
console.log(process.env.MONGO_URL);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};
connectDB()

app.use(express.json())
app.use(cookieParser())
// cors
app.use(cors({
    origin: true,
    credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World!")
})


// for registering the user
app.post("/register", async (req, res) => {
    try {
        let { username, password } = req.body;

        // Basic checks
        if (!username || !password) {
            return res.status(400).json("Username and password are required");
        }

        // Sanitizing the input
        username = validator.escape(username);

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json("User already exists");
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({ username, password: hashedPassword });

        jwt.sign({ userId: createdUser._id, username: createdUser.username }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
        
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
});

// for profile like checking if the user is logged in using tokens
app.get("/profile", (req,res) => {
    const token = req.cookies?.token;
    if(token) {
        jwt.verify(token , process.env.JWT_SECRET, {} ,  (err, userData) => {
            if (err) throw err;
         
            res.json(userData)
        }) 

    }
    else{
        res.status(420).json("no token")
    }
})

app.post('/login', async (req,res) =>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({username})
    if(foundUser){
        const passOk =  bcrypt.compareSync(password , foundUser.password)
        if(passOk){
            jwt.sign({userId: foundUser._id, username: foundUser.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).status(201).json({
                    id: foundUser._id,
                });
            });
        }
    }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
