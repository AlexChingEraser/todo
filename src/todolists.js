const path = require('path')
const fs = require('fs')

let todoListsPath = path.resolve('data', 'todo')

const ItemStatus = {
    INPROGESS: 'in progress',
    DONE: 'done'
}

class ToDoLists {
    constructor() { }
    /**
     * store a item in `todo` file
     * @param {String} item
     * @return {Number} index
     */
    addItem(item) {
        try {
            let newItemIndex = this._countNewItemIndex()
            let appendContent = this._concatContent(newItemIndex, item, ItemStatus.INPROGESS)
            this._writeContentToFile(appendContent)
            return newItemIndex
        } catch (error) {
            console.log(error)
        }
    }

    tagDone(itemIndex) {
        let res = false
        try {
            let todolists = fs.readFileSync(todoListsPath, 'utf8')
            todolists = todolists.split('\n')
            todolists[itemIndex - 1] = itemIndex + ',' + todolists[itemIndex].split(',')[1] + ',' + ItemStatus.DONE
            todolists = todolists.join('\n')
            fs.writeFileSync(todoListsPath, todolists, 'utf8')
            res = true
        } catch (error) {
            console.log(error)
        }
        return res
    }

    _countNewItemIndex() {
        try {
            let todoListsBeforeAdd = fs.readFileSync(todoListsPath, 'utf8')
            if (todoListsBeforeAdd == '') return 1
            return todoListsBeforeAdd.split('\n').length
        } catch (error) {
            console.error(error)
        }
    }

    _concatContent(index, item, status) {
        return index + ',' + item + ',' + status + '\n'
    }

    _writeContentToFile(content) {
        try {
            fs.appendFileSync(todoListsPath, content, 'utf8');
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new ToDoLists()