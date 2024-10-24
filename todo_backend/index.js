// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv');
dotenv.config();
const app = express(); 
const PORT = process.env.PORT;


const userRoutes = require('./routes/UserRoutes');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.get('/' ,(req, res)=> res.status(200).json({messege:"Backend Deployed"}));

mongoose.connect(process.env.URL)
    .then(() => {
        app.listen(process.env.PORT, (err) => {
            if (err) console.log(err);
            console.log(`Server is running on port ${PORT}`);
            });
})
.catch((error) => {
      console.log("Error", error);
});
app.use('/user', userRoutes);
