/**
 * Todo Item
 */

const TodoStatus = require('../consts/todoStatus.js')

class TodoItem {
    constructor(id, subject, status=TodoStatus.INPROGRESS) {
        this.id = id //序号
        this.subject = subject //主题
        this.status = status
    }
    
    changeStatus(newStatus) {
        this.status = newStatus
    }
}

module.exports = TodoItem