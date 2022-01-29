/**
 * todo
 */
const Storage = require("../storage.js")
const TodoItem = require('./todoItem.js')
const TodoStatus = require('../consts/todoStatus.js')


class Todo {
    constructor() {
        this.storage = new Storage()
    }

    /**
     * 查询最新的可用待办项id
     * @returns res
     */
    queryLastIndex() {
        return this.storage.queryLastIndex()
    }

    /**
     * 只查看已完成的待办项
     * @returns res
     */
    queryUndonedItems() {
        return this.queryItems({ status: TodoStatus.INPROGRESS })
    }

    /**
     * 查看全部待办项
     * @returns res
     */
    queryAllItems() {
        return this.queryItems({})
    }

    /**
     * 根据查询语句查询指定的todoitem
     * @param {Object} query
     * @returns {Array} res
     */
    queryItems(query) {
        let res = []
        let todolists = this.storage.query() //[ '1:python:in progress', '2:java:done', '3:javascript:done' ]
        for (let item of todolists) {
            let [id, subject, status] = item.split(':')
            let queryItem = new TodoItem(id, subject, status)
            if (this.equalToQueryCondition(queryItem, query)) {
                res.push(queryItem)
            }
        }
        return res
    }

    /**
     * 添加新的待办项
     * @param {String} subject 
     * @returns {Number} index
     */
    appendItem(subject) {
        let res = this.storage.appendItem(subject)
        return res
    }

    /**
     * 更改一个待办项的状态
     * @param {Number} index 
     * @returns {Number} res
     */
    changeItemStatus(index) {
        let res = this.storage.updateItem(index)
        return res
    }

    /**
     * 重置待办项
     */
    resetItems() {
        this.storage.clearAll()
    }

    /**
     * 判断查询出的todoitem是否与查询条件相符
     * @param {String} id 
     * @param {String} subject 
     * @param {String} status 
     * @param {Object} query 
     */
    equalToQueryCondition(queryItem, query) {
        for (let key of Object.keys(query)) {
            if (query[key] !== queryItem[key])
            return false
        }
        return true
    }
}

module.exports = Todo