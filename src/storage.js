const path = require('path')
const fs = require('fs')

let storagePath = path.resolve('data', 'todo')

class ToDoStorage {
    constructor() { }
    /**
     * store a item in `todo` file
     * @param {String} item
     * @return {Number} index
     */
    storeItem(item) {
        let content = item + '\n'
        try {
            fs.appendFileSync(storagePath, content, 'utf8');
            let data = fs.readFileSync(storagePath, 'utf8')
            return data.split('\n').length - 1
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new ToDoStorage()