const mongoose = require('mongoose');


const dbConnect =() =>{
    try {
      mongoose.connect(process.env.MONGO_URI);
       console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Mongodb Connection Failed",err);
    }
}

module.exports=dbConnect;