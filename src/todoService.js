const TodoStatus = require('./consts/todoStatus.js')
const Todo = require('./model/todo.js')

class TodoService {
    constructor() {
        this.todo = new Todo()
    }

    /**
     * query todolist without doned items
     * @returns {Array}: res
     */
    list() {
        let res = []
        let items = this.todo.queryUndonedItems()
        items.forEach((item) => {
            res.push(`[${item.id}]. ${item.subject}`)
        })

        return res
    }

    /**
     * query all todolist items
     * @returns {todolists: Array, donedItems: Number}: res
     */
    listAll() {
        let res = []
        let todolistsAll = this.todo.queryAllItems()
        let donedItems = todolistsAll.length - this.todo.queryUndonedItems().length
        todolistsAll.forEach(item => res.push(`[${item.id}]. [${item.status}] ${item.subject}`))

        return {
            todolists: res,
            donedItems: donedItems
        }
    }

    /**
     * Add a itme in todo app [sync]
     * @param {String} item
     * @return {Number} index 添加进去的待办项的索引
     */
    createNewItem(subject) {
        let index = this.todo.appendItem(subject)
        return index
    }

    /**
     * 将一个待办项的状态更改为`完成`状态
     * @param {Number} itemIndex 
     * @returns {Boolean} res
     */
    changeExistItemStatus(itemIndex) {
        let res = this.todo.changeItemStatus(itemIndex)
        return res
    }

    /**
     * 重置待办项
     */
    reset() {
        this.todo.resetItems()
    }
}

module.exports = TodoService