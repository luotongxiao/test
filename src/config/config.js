require('dotenv').config()

module.exports = {
    account: process.env.account,
    password: ${{os.environ.password}},
    address: process.env.address,
    temperature: process.env.temperature
}
