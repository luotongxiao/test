const sendHealthData = require('./login/sendHealthData')

sendHealthData().catch(err => {
    console.log(err)
})