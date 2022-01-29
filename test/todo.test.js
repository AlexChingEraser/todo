const Todo = require('../src/model/todo.js')

jest.mock('../src/storage.js')
let Storage = require('../src/storage.js')
let storage = new Storage()
storage.query.mockImplementation(() => ['1:python:undefined', '1:javascript:undefined', '3:javascript:undefined'])


let todo = new Todo()
todo.storage = storage

test('handle query successful', () => {
    expect(todo.queryItems({ status: TodoStatus.INPROGRESS })).toEqual([1, 2, 3])
})

