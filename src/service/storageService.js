/**
 * storageService.js
 */

 const fs = require('fs')
 
 class StorageService {
     constructor(storagePath) {
         this.storagePath = storagePath
         if (!fs.existsSync(this.storagePath)) {
            fs.appendFileSync(storagePath, '', function (err) {
                if (err) throw err;
              });
         }
     }
 
     query() {
         let res = []
         try {
             let items = fs.readFileSync(this.storagePath, 'utf8')
             if (items === '') return res
             res = items.trim().split('\n').map(item => item.trim())
         } catch (error) {
             console.log(error)
         }
         return res
     }
 
     /**
      * 获取数据文件的最高索引
      */
     queryLastIndex() {
         return this.query().length + 1
     }
 
     /**
      * 添加一个待办项至数据文件
      * @param {String} item
      * @returns {Boolean} res
      */
     appendItem(subject) {
         let index = this.queryLastIndex()
         let newItem = this.formatItem(index, subject, TodoStatus.INPROGRESS) + '\n'
         try {
             fs.appendFileSync(this.storagePath, newItem, 'utf8');
         } catch (error) {
             console.error(error)
         }
         return index
     }
 
     /**
      * 根据索引搜索待办项，但索引需要减一因为列表的初始索引为0
      * @param {Number} index 
      * @returns {String} item
      */
     queryItemByIndex(index) {
         try {
             let items = this.query()
             if (index > items.length) throw new Error('代办项索引出错!');
             return items[index]
         } catch (error) {
             console.log(error)
         }
     }
 
     /**
      * 更新一个待办项的内容
      * @param {Number} index 
      * @param {String} newItem 
      * @returns {Boolean} res
      */
     updateItem(qureyIndex) {       
         let res = false
         let index = qureyIndex - 1
         try {
             let item = this.queryItemByIndex(index)
             let [_, subject, status] = item.split(':')
             let newItem = this.formatItem(qureyIndex, subject, TodoStatus.DONE)
             let updatedtodolists = this.concatNewItems(index, newItem)
             fs.writeFileSync(this.storagePath, updatedtodolists, 'utf8')
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
             let items = this.query()
             items[index] = newItem
             updatedtodolists = items.join('\n')
         } catch (error) {
             console.error(error)
         }
 
         return updatedtodolists
     }
 
     /**
      * 重置待办项
      */
     clearAll() {
         fs.writeFileSync(this.storagePath, '', 'utf8')
     }
 
     /**
      * 构造一个新的待办项字符串
      * @param {String} index 
      * @param {String} subject 
      * @param {String} status 
      * @returns {String} res
      */
      formatItem(index, subject, status) {
         return `${index}:${subject}:${status}`
     }
 
 }
 
 module.exports = StorageService