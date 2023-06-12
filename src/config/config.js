import dotenv from "dotenv"

dotenv.config({ path: '.env' })

export default {
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    role:process.env.NODE_ENV,

    test_mail_user: process.env.TEST_MAIL_USER,
    test_mail_pass: process.env.TEST_MAIL_PASS,
    test_mail_host: process.env.TEST_MAIL_HOST,
    test_mail_port: process.env.TEST_MAIL_PORT,
    test_mail_from: process.env.TEST_MAIL_FROM,

    mail_user: process.env.MAIL_USER,
    mail_pass: process.env.MAIL_PASS,
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_from: process.env.MAIL_FROM,

}