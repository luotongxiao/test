const axios = require('axios')
const getLoginPage = require('./loginPage')
const { account, password } = require('../config/config')

async function homePage() {
    let dataObj = await getLoginPage()
    dataObj['__EVENTTARGET'] = 'logon'
    dataObj['__EVENTARGUMENT'] = ''
    dataObj['log_username'] = account
    dataObj['log_password'] = password
    ASPCookie = dataObj.ASPCookie
    delete dataObj.ASPCookie

    let data = new URLSearchParams()
    for (const key in dataObj) {
        if (Object.hasOwnProperty.call(dataObj, key)) {
            const element = dataObj[key]
            data.append(key, element)
        }
    }


    let ret

    let hasError = true
    while (hasError) {
        try {
            ret = await axios({
                method: 'post',
                url: 'https://ssp.scnu.edu.cn/login.aspx',
                headers: {
                    'Cookie': ASPCookie
                },
                data: data
            })

            hasError = false

        } catch (error) {
            console.log(error)
        }
    }

    let key = ret.data.match(/<a.+?\?key=(.+)\"\>疫情防控/)[1]

    return {
        url: 'https://ssp.scnu.edu.cn/opt_yq_jkdk.aspx?key=' + key,
        ASPCookie
    }

}

module.exports = homePage