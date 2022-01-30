/**
 * loginService.js
 */

const fs = require('fs')
const rd = require('readline')
const { configPath } = require('../consts/path.js')

class LoginService {
    /**
     * 用户登录逻辑
     * @param {String} username 
     * @returns 
     */
    login(username, passwd) {
        let config = fs.readFileSync(configPath, 'utf8')
        let auth = config.trim().split('\n')
        let realpasswd = ''
        for (let item of auth) {
            let [authname, authpasswd] = item.split(':')
            if (authname == username) {
                realpasswd = authpasswd
            }
        }
        if (realpasswd.trim() == passwd.trim()) return true
        else return false
    }

    /**
     * 用户登出
     */
    logout() {     
        let users = JSON.stringify({
            "username": null
        }, null, 2)
        fs.writeFileSync('./todo.json', users)
        return true
    }

    /**
     * 更新todo.json中的内容
     * @param {String} username 
     */
    updateLoginUser(username) {
        let users = JSON.stringify({
            "username": username
        }, null, 2)
        fs.writeFileSync('./todo.json', users)
    }
}

module.exports = LoginService