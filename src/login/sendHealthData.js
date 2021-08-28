const FormData = require('form-data')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const getHealthPageData = require('./healthPage')
let { address, temperature } = require('../config/config')

async function sendHealthData() {
    let {
        __EVENTVALIDATION,
        __VIEWSTATE,
        ASPCookie,
        url
    } = await getHealthPageData()

    let form = new FormData()
    form.append('__EVENTTARGET', '')
    form.append('__EVENTARGUMENT', '')
    form.append('__VIEWSTATE', __VIEWSTATE)
    form.append('ctl00$cph_right$e_location', address)
    form.append('ctl00$cph_right$e_health$0', '无不适')
    form.append('ctl00$cph_right$e_temp', temperature)
    form.append('ctl00$cph_right$e_travel', '无')
        // form.append('ctl00$cph_right$e_annex', fs.createReadStream(path.resolve(__dirname, '../config/1.jpg')))
        // form.append('ctl00$cph_right$e_annex2', fs.createReadStream(path.resolve(__dirname, '../config/1.jpg')))
    form.append('ctl00$cph_right$e_describe', '')
    form.append('ctl00$cph_right$e_submit', '提交保存')
    form.append('__VIEWSTATEGENERATOR', '3349166E')
    form.append('__EVENTVALIDATION', __EVENTVALIDATION)

    let formDataHeaderContentType = (form.getHeaders())['content-type']
    axios({
        method: 'post',
        url: url,
        headers: {
            Cookie: ASPCookie,
            'Content-Type': formDataHeaderContentType
        },
        data: form
    }).then(res => {
        console.log('success')
    }, err => {
        console.log('err')
    })

}

module.exports = sendHealthData