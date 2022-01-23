const path = require('path')
const fs = require('fs')
const { TodoStatus } = require('./consts/todoStatus.js')
const { storagePath } = require('./consts/storagePath.js')
const { ExternalSep, InternalSep } = require('./consts/fileSep')

class ToDoLists {
    constructor() { }
    /**
     * 获取数据文件的最高索引
     */
    queryLastItemIndex() {
        let index = -1
        try {
            let items = this.fetchTodolists()
            index = items.length
        } catch (error) {
            console.error(error)
        }

        return index
    }

    /**
     * 查找当前文件中所有的待办项
     * @returns {Array} items
     */
    fetchTodolists() {
        let items = fs.readFileSync(storagePath, 'utf8')
        if (items == '') {//没有待办项，数据文件为空
            return []
        }
        items = items.split(ExternalSep)
        items.splice(items.length - 1, 1) //最后一个元素是'', 将其删除

        return items
    }

    /**
     * 添加一个待办项至数据文件
     * @param {String} item
     * @returns {Boolean} res
     */
    createNewItem(item) {
        let res = false
        try {
            fs.appendFileSync(storagePath, item, 'utf8');
            res = true
        } catch (error) {
            console.error(error)
        }

        return res
    }

    /**
     * 根据索引搜索待办项，但索引需要减一因为列表的初始索引为0
     * @param {Number} index 
     * @returns {String} item
     */
    queryItemByIndex(index) {
        let item = ''
        try {
            let items = this.fetchTodolists()
            item = items[index]
        } catch (error) {
            console.log(error)
        }
        return item
    }

    /**
     * 更新一个待办项的内容
     * @param {Number} index 
     * @param {String} newItem 
     * @returns {Boolean} res
     */
    updateItemByIndex(index, newItem) {
        let res = false
        try {
            let updatedtodolists = this.concatNewItems(index, newItem)
            fs.writeFileSync(storagePath, updatedtodolists, 'utf8')
            res = true
        } catch (error) {
            console.log(error)
        }

        return res
    }

    /**
     * 覆盖新的待办项待办项， 生成新的待办项列表
     * @param {Number} index 
     * @param {String} newItem 
     */
    concatNewItems(index, newItem) {
        let updatedtodolists = ''
        try {
            let items = this.fetchTodolists()
            items[index] = newItem
            updatedtodolists = items.join(ExternalSep)
            updatedtodolists += ExternalSep
        } catch (error) {
            console.error(error)
        }

        return updatedtodolists
    }

    /**
     * 获取全部代办项
     * @returns {Array} res
     */
    queryAllItems() {
        let res = []
        try {
            res = this.fetchTodolists()
        } catch (error) {
            console.error(error)
        }
        return res
    }

    /**
     * 获取全部未完成的待办项
     * @returns {Array} undonedItems
     */
    queryUndonedItems() {
        let undonedItems = []
        try {
            let items = this.fetchTodolists()
            undonedItems = items.filter(item => !this.itemIsDone(item))
        } catch (error) {
            console.error(error)
        }
        return undonedItems
    }

    /**
     * 判断一个待办项是否已完成
     * @param {String} item 
     * @returns {Boolean} res
     */
    itemIsDone(item) {
        return item.includes('done')
    }

    /**
     * 重置待办项
     */
    clearAll() {
        fs.writeFileSync(storagePath, '', 'utf8')
    }

}

module.exports = new ToDoLists()