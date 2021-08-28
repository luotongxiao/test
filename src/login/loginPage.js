const axios = require('axios')

async function getLoginPage() {
    try {
        var { data, headers } = await axios({
            url: 'https://ssp.scnu.edu.cn/login.aspx'
        })
    }
    catch (error) {
        console.log(error)
        return
    }

    let __VIEWSTATE = data.match(/id="__VIEWSTATE" value="(.+)" \/>/)[1]
    let __VIEWSTATEGENERATOR = data.match(/id="__VIEWSTATEGENERATOR" value="(.+)" \/>/)[1]
    let __EVENTVALIDATION = data.match(/id="__EVENTVALIDATION" value="(.+)" \/>/)[1]

    let ASPCookie = headers['set-cookie'][0].split(/[;]/)[0]

    return {
        __VIEWSTATE,
        __VIEWSTATEGENERATOR,
        __EVENTVALIDATION,
        ASPCookie
    }
}

module.exports = getLoginPage