import mongoose from "mongoose";

let isConnected = false; //track connection status to the mongo database

/*
here, creating a function to connect to the db
strictQuery "sets mongoose options"

then function checks if connected
*/
export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        // useNewUrlParser is not a parameter in the mongoose object's connect options
        // will change this if necessary
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "share_prompt", 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        isConnected = true;
        console.log("MongoDB Connected");
    } catch(err) {
        console.log(err);
    }
}