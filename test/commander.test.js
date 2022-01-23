let commander = require('../src/commander.js')
let app = require('../src/app.js')
let path = require('path');
let exec = require('child_process').exec;
jest.mock('../src/app.js')

test('Code should be 0', async () => {
    let result = await cli(['add', 'happy test'], '.');
    expect(result.code).toBe(0);
})



beforeAll(() => {
    app.createNewItem.mockImplementation(() => 1)
})

test('should commandService add action return correct format', () => {
    let item = "HTTP study"
    //commander.
});


function cli(args, cwd) {
    return new Promise(resolve => {
        exec(`node ${path.resolve('./main.js')} ${args.join(' ')}`,
            { cwd },
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr
                })
            })
    })
}