const dotenv = require('dotenv')

dotenv.config()

const ENV = {
    Port : process.env.PORT,
    DatabaseURL : process.env.Database_URL
}