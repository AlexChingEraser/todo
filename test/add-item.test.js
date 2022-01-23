let app = require('../src/app.js')
let fs = require('fs')
let path = require('path')

let listLength = -1

beforeEach(() => {
    let data = fs.readFileSync(path.resolve('data', 'todo'), 'utf8')
    listLength = data.split('\n').length - 1
    return
})

test('add todo item', () => {
    expect(app.addItem("go programming")).toEqual(listLength + 1)
})

test('tag one item status into done', () => {
    expect(app.completeItem(2)).toBeTruthy()
})