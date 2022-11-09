const sendHealthData = require('./login/sendHealthData')

// test
sendHealthData().catch(err => {
    console.log(err)
})
