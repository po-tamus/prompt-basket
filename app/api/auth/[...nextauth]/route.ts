// route is app/api/auth/[...nextauth]
// this file is for defining API routes

import NextAuth, { AuthOptions, NextAuthOptions, Profile } from "next-auth";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user"
import { connectToDB } from "@utils/database";

/*
define handler for nextauth: this function handles authentication related actions (signing in, out)
this includes the parameters: 
    providers: defining the authentication and sign in providers
    session: async function to store the user session and handle session retrieval
    signIn: async function to handle signing in of the user and the logic behind it
*/



const authOptions: NextAuthOptions = {

    // simply define the environment variables using "as string"
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ], 
    callbacks: {
        async session({session}:{session: Session}) {
            // retrieving and modifying the session before it is returned to the client
            // here, finding if the there is a User (mongo) that has a matching email 
            const sessionUser = await User.findOne({
                email: session.user?.email,
            })
            // then setting the id of the session user to the id from the mongo db
            // this is a unique id created by mongo?? since User schema doesn't have id attribute
            // updatint the next js session id to the returned mongo entry id (User)
            session.user.id = sessionUser._id.toString();

            return session;
        }, 
        async signIn({profile}:{profile:Profile}) {
            // implement sign in logic
            // allow or deny access to sign in
            try {
                await connectToDB();

                //check if user exists
                const userExists = await User.findOne({
                    email: profile?.email
                })
                // if not, create a user
                if (!userExists) {
                    // creating a 
                    await User.create({
                        email: profile?.email, 
                        username: profile?.name?.replace(" ", "").toLowerCase(), 
                        image: profile?.image
                    })
                }

            } catch(err) {
                console.log(err)
            }
        }
    }
}

const handler = NextAuth(authOptions);