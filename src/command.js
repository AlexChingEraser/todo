/**
 * command.js
 */

const readlineSync = require('readline-sync');
const { Command } = require('commander')
const App = require('./app.js')

let app = new App()
app.init()

let commandService = new Command()

/**
 * login
 */
commandService.command('login').description('user login')
    .option('-u, --user <username>', 'specific username')
    .action(function (option) {
        if (!option.user) {
            console.log('login with the `-u` option')
            return
        }
        let passwd = readlineSync.question('Password: '); //同步读取输入
        let res = app.loginService.login(option.user, passwd)
        if (res) { app.loginService.updateLoginUser(option.user); return; }//初始化工作
        else console.log('login failed'); return;
    })

/**
 * logout
 */
commandService.command('logout').description('user logout')
    .action(function () {
        let res = app.loginService.logout()
        if (res) { console.log('Logout success!'); return; }
        else console.log('Logout failed')
    })

/**
 * help
 */
commandService.command('help').description('app use tips')
    .action(function () {
        console.log(`
Usage: todo [command] [options]

An application for todo management

Commands:
  help                            Help message
  login [-u, --user] <username>   login with the specific username
  logout                          logout with current user
  add <item>                      Add Todo Item
  done <item-index>               Label a item status to done
  list [-a, --all]                List all undoned items, '--all' will list all the items, inlcude done and undoned
  reset                           Clear all the item you created and modified
    `)
    })

/**
 * add
 */
commandService.command('add').description('add a todo item')
    .argument('<item>')
    .action(function (item) {
        if (!app.isLogin()) {
            console.log('you should login to use the todo app.');
            return;
        }
        let index = app.todoService.createNewItem(item)
        if (index == -1) {
            console.log('add fail!');
            return
        }
        console.log(`   
${index} ${item}

Item ${index} added
    `)
    })

/**
 * done
 */
commandService
    .command('done')
    .argument('<itemIndex>')
    .description('label a todo item status into `done`')
    .action(function (itemIndex) {
        if (!app.isLogin()) { 
            console.log('you should login to use the todo app.'); 
            return; 
        }
        let res = app.todoService.changeExistItemStatus(itemIndex)
        if (res) {//完成代办项
            console.log(`Item ${itemIndex} done`)
        } else {
            console.log(`done failed`)
        }
    })

/**
 * list [-a, --all]
 */
commandService
    .command('list')
    .description('only list the undoned todo item')
    .option('-a, --all', 'list all the todo items')
    .action((option) => {
        if (!app.isLogin()) { 
            console.log('you should login to use the todo app.'); 
            return; 
        }
        if (option.all) {
            let todoListsAll = app.todoService.listAll()
            todoListsAll.todolists.forEach(item => console.log(item))
            console.log(`Total: ${todoListsAll.todolists.length} items, ${todoListsAll.donedItems} item done`)
        } else {
            let todoLists = app.todoService.list()
            todoLists.forEach(item => console.log(item))
            console.log(`Total: ${todoLists.length} items`)
        }
    })

/**
 * reset
 */
commandService
    .command('reset')
    .description('clear all the todo items')
    .action(() => {
        if (!app.isLogin()) { 
            console.log('you should login to use the todo app.'); 
            return; 
        }
        app.todoService.reset()
    })

module.exports = commandService