let todolists = require("./todolists.js")
const { TodoStatus } = require('./consts/todoStatus.js')
const { ExternalSep, InternalSep } = require('./consts/fileSep')

class TodoApp {
    constructor() { }

    /**
     * query todolist without doned items
     * @returns {Array}: res
     */
     list() {
        let res = []
        let undonedItems = todolists.queryUndonedItems()
        undonedItems.forEach((item) => {
            item = item.split(InternalSep)
            res.push(`[${item[0]}]. ${item[1]}`)
        })

        return res
    }

    /**
     * query all todolist items
     * @returns {todolists: Array, donedItems: Number}: res
     */
    listAll() {
        let listFormat = []
        let todolistsAll = todolists.queryAllItems()
        let donedItems = todolistsAll.length - todolists.queryUndonedItems().length
        todolistsAll.forEach(item => {
            item = item.split(InternalSep)
            listFormat.push(`[${item[0]}]. [${item[2]}] ${item[1]}`)
        })

        return {
            todolists: listFormat,
            donedItems: donedItems
        }
    }

    /**
     * Add a itme in todo app [sync]
     * @param {String} item
     * @return {Number} index 
     */
    createNewItem(item) {
        let lastIndex = todolists.queryLastItemIndex()
        let createTodoItem = this.formatCreatedItem(lastIndex + 1, item)
        let createSuccessfully = todolists.createNewItem(createTodoItem)
        if (createSuccessfully) {
            return lastIndex + 1
        } else {
            return -1
        }
    }

    /**
     * tag done toward `itemIndex`
     * @param {Number} itemIndex 
     * @returns {Boolean} res
     */
    changeExistItemStatus(itemIndex, status=TodoStatus.DONE) {
        let todoItem = todolists.queryItemByIndex(itemIndex - 1)
        let newTodoItem = this.formatExistItemStatus(todoItem)
        let res = todolists.updateItemByIndex(itemIndex - 1, newTodoItem)

        return res
    }

    /**
     * concat update string with an given `item`
     * @param {Number} index
     * @param {String} item 
     * @param {String} status 
     * @returns 
     */
    formatCreatedItem(index, item, status=TodoStatus.INPROGESS) {
        return `${index}${InternalSep}${item}${InternalSep}${status}${ExternalSep}`
    }


    /**
     * change exist todo item's status
     * @param {String} todoItem 
     * @param {String} changeStatus 
     * @returns {String} res
     */
    formatExistItemStatus(todoItem, changeStatus=TodoStatus.DONE) {
        return `${todoItem.split(InternalSep)[0]}${InternalSep}${todoItem.split(InternalSep)[1]}${InternalSep}${changeStatus}`
    }

    /**
     * 重置待办项
     */
    reset() {
        todolists.clearAll()
    }
}

module.exports = new TodoApp()