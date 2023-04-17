import dotenv from "dotenv"

dotenv.config({ path: '.env' })

export default {
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    role:process.env.NODE_ENV
}