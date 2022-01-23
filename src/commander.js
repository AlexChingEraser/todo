let app = require('./app.js')

const { Command } = require('commander')
let commandService = new Command()

commandService
  .command('help')
  .description('app use tips')
  .action(() => {
    console.log(`
Usage: todo [command] [options]

An application for todo management

Commands:
  help                Help message
  add <item>          Add Todo Item
  done <item-index>   Label a item status to done
  list [-a, --all]    List all undoned items, '--all' will list all the items, inlcude done and undoned
  reset               Clear all the item you created and modified
    `)
  })

commandService
  .command('add')
  .argument('<item>')
  .description('add a todo item')
  .action((item) => {
    let index = app.createNewItem(item)
    if (index == -1) { console.log('add fail!'); return }
    console.log(`   
${index} ${item}

Item ${index} added
    `)
  })

commandService
  .command('done')
  .argument('<itemIndex>')
  .description('label a todo item status into `done`')
  .action((itemIndex) => {
    let res = app.changeExistItemStatus(itemIndex)
    if (res) {//完成代办项
      console.log(`Item ${itemIndex} done`)
    } else {
      console.log(`done failed`)
    }
  })

commandService
  .command('list')
  .description('only list the undoned todo item')
  .option('-a, --all', 'list all the todo items')
  .action((option) => {
    if (option.all) {
      let todoListsAll = app.listAll()
      todoListsAll.todolists.forEach(item => console.log(item))
      console.log(`Total: ${todoListsAll.todolists.length} items, ${todoListsAll.donedItems} item done`)
    } else {
      let todoLists = app.list()
      todoLists.forEach(item => console.log(item))
      console.log(`Total: ${todoLists.length} items`)
    }
  })

commandService
  .command('reset')
  .description('clear all the todo items')
  .action(() => {
    app.reset()
  })

module.exports = commandService