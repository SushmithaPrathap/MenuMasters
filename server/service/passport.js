import passport from 'passport';
import {keys} from '../config/dev/keys'
import { Strategy } from 'passport-google-oauth20';


passport.use(new Strategy({
    clientID : keys.clientID,
    clientSecret: keys.secretID,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('accesstoken',accessToken)
}))
