import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

interface GoogleProfile {
    _json: {
        sub: string;
        email: string;
        name: string;
        picture: string;
        [key: string]: any;
    };
    [key: string]: any;
}



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            scope: ["email", "profile"],
            passReqToCallback: true,
        })
    }
    validate(req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback) {

        const gprofile = profile as GoogleProfile
        const { name, email, picture } = gprofile._json;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user = { accessToken, profile: picture, email, name }
        done(null, user)
    }
}