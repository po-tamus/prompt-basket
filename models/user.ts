import { Schema, model, models } from "mongoose";

/*
unique is set to array with first element true and second element if not true (already exists)
required is set to array with first element true and second element if not true (email is required)

for the username attribute, there is a regex match: 
if the username is matched by the regex, it can be used and stored in the db
if the username doesnt match, message will be displayed
*/

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists."],
        required: [true, "Email is requried."]
        
    }, 
    username: {
        type: String,
        required: [true, "Username is required."], 
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
             "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    }, 
    image: {
        type: String
    }
})

// DONT NEED THIS SINCE NOT WORKING WITH A CONSTANTLY RUNNING EXPRESS SERVER
// this is because imported models library can check if created models has an existing
// model that matches the one we are trying to create, so we can use an updated version of this

// const UserModel = model("projects", UserSchema);
// module.exports = UserModel;

const User = models.User || model("User", UserSchema);
export default User;