import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { envVars } from "./env";


passport.use(
    new googleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL,

        },async()=>{}
    )
)