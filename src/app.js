let todolists = require("./todolists.js")

class TodoApp {
    constructor() {}
    
    /**
     * Add a itme in todo app [sync]
     * @param {String} item
     * @return {Number} index 
     */
    addItem(item) {
        let newItemIndex = todolists.addItem(item)

        return newItemIndex
    }

    /**
     * tag done toward `itemIndex`
     * @param {Mumber} itemIndex 
     * @returns {Boolean} res
     */
    completeItem(itemIndex) {
        let res = todolists.tagDone(itemIndex)

        return res
    }
}

module.exports = new TodoApp()