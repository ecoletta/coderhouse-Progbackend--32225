import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    gitHubClientSecret: process.env.GITHUBCLIENTSECRET,
    secret: process.env.SECRET,
    persistence: process.env.PERSISTENCE,
    nodeEnv: process.env.NODEENV
}