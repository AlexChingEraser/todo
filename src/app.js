/**
 * app.js => todo app
 */

const fs = require('fs');
const path = require('path')
const LoginService = require('./service/loginService.js')
const TodoService = require('./service/todoService.js')
const StorageService = require('./service/storageService.js')

class App {
    constructor() {
        this.loginUser = null
        this.loginService = new LoginService()
        this.todoService = null
        this.init = function () {
            let rawUsers = fs.readFileSync('./todo.json')
            let users = JSON.parse(rawUsers)
            if (users['username'] === null) {
                return
            } else {
                this.loginUser = users['username']
                let storagePath = path.resolve('data', `${this.loginUser}-todo`)
                let storageService = new StorageService(storagePath)
                this.todoService = new TodoService(storageService)
            }
        }
        this.isLogin = function () {
            return this.loginUser !== null
        }
    }
}

module.exports = App