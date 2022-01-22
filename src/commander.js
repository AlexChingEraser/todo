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
  done                Label a item status to done
  list [--all]        List all undoned items, '--all' will list all the items, inlcude done and undoned
    `)
  })

commandService
  .command('add')
  .argument('<item>')
  .description('add a todo item')
  .action((item) => {
    let index = app.AddItem(item)
    if (index == -1) { console.log('add fail!'); return }
    console.log(`   
${index} ${item}

Item ${index} added
    `)
  })

module.exports = commandService