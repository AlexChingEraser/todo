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
  list [--all]        List all undoned items, '--all' will list all the items, inlcude done and undoned
    `)
  })

commandService
  .command('add')
  .argument('<item>')
  .description('add a todo item')
  .action((item) => {
    let index = app.addItem(item)
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
    let res = app.completeItem(itemIndex)
    if (res) {//完成代办项
      console.log(`Item ${itemIndex} done`)
    } else {
      console.log(`done failed`)
    }
  })

module.exports = commandService