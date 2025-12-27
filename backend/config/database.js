const mongoose = require('mongoose')

const DBConnection = async() =>{
const MONGO_URI = process.env.MONGODB_URL;

try{
const conn = await mongoose.connect(MONGO_URI)
console.log("db connection established successfully")
return conn
}
catch(error){
     console.error("❌ Error while connecting to MongoDB:", error.message);
        process.exit(1);
}
}

module.exports = { DBConnection };
