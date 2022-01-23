
jest.mock('fs')
let fs = require('fs')
fs.readFileSync.mockImplementation(() => "1:happy coding:in progress  2:sad coding:in progress  3:crying coding:done  ")

let todolists = require('../src/todolists.js')

test('fetch all the todo items', () => {
    expect(todolists.fetchTodolists()).toEqual(['1:happy coding:in progress', '2:sad coding:in progress', '3:crying coding:done'])
})

test('query undoned todo items successfully', () => {
    expect(todolists.queryUndonedItems()).toEqual(['1:happy coding:in progress', '2:sad coding:in progress'])
})

test('concat new items correctly', () => {
    expect(todolists.concatNewItems(1, '2:fufu:done')).toEqual("1:happy coding:in progress  2:fufu:done  3:crying coding:done  ")
})