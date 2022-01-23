let todolists = require("../src/todolists.js")
let app = require('../src/app.js')
const { ExternalSep, InternalSep } = require('../src/consts/fileSep')

jest.mock('../src/todolists.js')

beforeAll(() => {
    todolists.queryUndonedItems.mockImplementation(() => [`1:go`, `2:python`, `3:rust`])
    todolists.queryAllItems.mockImplementation(() => [`1:go:in progress`, `2:python:done`, `3:rust:done`])
})

test('concat todo item content correctly', () => {
    expect(app.formatCreatedItem(1, 'gogogo')).toEqual(`1:gogogo:in progress  `)
})

test('change status of exist item correctly', () => {
    expect(app.formatExistItemStatus(`2:fufu:in progress`)).toEqual(`2:fufu:done`)
})

test('list all todo items', () => {
    let res = app.listAll()
    expect(res.todolists).toEqual(["[1]. [in progress] go", "[2]. [done] python", "[3]. [done] rust"])
})

test('list undoned todo items', () => {   
    expect(app.list()).toEqual(["[1]. go", "[2]. python", "[3]. rust"])
})