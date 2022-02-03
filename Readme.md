name: nodejs

on: 
  gollum: 
  push:
  schedule:
    - cron: '02 16 * * *'

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: use Node.js 10.x
      uses: actions/setup-node@v1
      with:
        node-version: 10.x
    - name: npm install
      run: |
        npm install
    - name: node ./src/main.js
      env:
        password: ${{secrets.password}}
        account: ${{secrets.account}}
        temperature: ${{secrets.temperature}}
        address: ${{secrets.address}}
      run:  |
        node ./src/main.js

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
    - uses: actions/checkout@v2
    - name: 'Send mail'
      uses: dawidd6/action-send-mail@v3
      with:
          server_address: smtp.139.com
          server_port: 465
          username: ${{secrets.MAIL_USERNAME}}
          password: ${{secrets.MAIL_PASSWORD}}
          subject: 打卡
          body: success
          to: 15766973191@139.com
          from: GitHub Actions