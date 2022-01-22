let ToDoStorage = require("./storage.js")

class TodoApp {
    constructor() {}
    
    /**
     * Add a itme in todo app [sync]
     * @param {String} item
     * @return {Number} index 
     */
    AddItem(item) {
        let itemIndex = ToDoStorage.storeItem(item)

        return itemIndex
    }
}

module.exports = new TodoApp()