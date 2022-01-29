jest.mock('fs')

const fs = require('fs')
const Storage = require('../src/storage.js')

let storage = new Storage()

fs.readFileSync.mockImplementation(() => '1:python:undefined\n1:javascript:undefined\n3:javascript:undefined\n')

test('trim successful', () => {
    expect(storage.query()).toEqual(['1:python:undefined', '1:javascript:undefined', '3:javascript:undefined'])
})