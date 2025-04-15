require("dotenv").config();

const config = {
    apiBaseURL: process.env.API_BASE_URL || 'http://localhost:8000',
    appPort: process.env.APP_PORT || 4000
}

module.exports = config