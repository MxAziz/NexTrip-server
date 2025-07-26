import passport from "passport";
import { Strategy as googleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";


passport.use(
    new googleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL,

        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0].value

                if (!email) {
                    return done(null, false, {message: "email not found"});
                }

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id,
                            }
                        ]
                    })
                }

                return done(null, user,)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("google strategy error", error);
                return done(error);
            }
        }
    )
)