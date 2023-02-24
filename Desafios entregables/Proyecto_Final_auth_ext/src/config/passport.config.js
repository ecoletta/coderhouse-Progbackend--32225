import passport from 'passport';
import GithubStrategy from 'passport-github2';
import { userModel } from '../models/user.model.js';

const initializaPassport = () => {
    passport.use(new GithubStrategy({
        clientID: 'Iv1.21e82d4bb4f510aa',
        clientSecret: '1ea0762a8ec7de8e53a077b0a87d75c94e92e5c9',
        callbackURL: 'http://localhost:8080/session/githubcallback',
        scope: ['user:email']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);

                const user = await userModel.findOne({ email: profile.emails[0].value })

                if (!user) {
                    const [first_name, last_name] = profile._json.name.split(' ')
                    const newUser = new userModel({
                        first_name,
                        last_name,
                        email: profile.emails[0].value,
                        password: '',
                        age: 18,
                        role: 'usuario'

                    })

                    const savedUser = await userModel.create(newUser)

                    done(null, newUser)
                } else {
                    done(null, user)
                }
            } catch (error) {
                done(error)
            }
        })
    );
    passport.serializeUser((user,done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user)
    });
};

export default initializaPassport