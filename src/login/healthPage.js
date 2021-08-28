const axios = require('axios')
const homePage = require('./homePage')

async function getHealthPageData() {
    let { url, ASPCookie } = await homePage()

    let healthPage
    try {
        healthPage = await axios({
            method: 'get',
            url: url,
            headers: {
                Cookie: ASPCookie
            }
        })
    } catch (error) {
        console.log(error)
        return
    }

    let __VIEWSTATE = healthPage.data.match(/<input[\d\D]+?id="__VIEWSTATE" value="([\w\W]+?)" \/>/)[1]
    let __EVENTVALIDATION = healthPage.data.match(/<input[\d\D]+?id="__EVENTVALIDATION" value="([\w\W]+?)" \/>/)[1]

    return {
        __EVENTVALIDATION,
        __VIEWSTATE,
        ASPCookie,
        url
    }
}

module.exports = getHealthPageData