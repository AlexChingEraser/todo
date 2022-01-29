# README

This is a to-do app practice from `GeekTime` cources written by `ZhengYe`.

## Stage1
### add todo item

```javascript
`todo add <item>`

[index]. <item>

Item <itemIndex> added
```

### done todo item

```javascript
`todo done <itemIndex>`

Item <itemIndex> done
```

### list undoned todo items

```javascript
`todo list`

[index]. <item>
...

Total: 2 items
```

### list all todo items

```javascript
`todo list --all`

[index]. <item>
[index]. [done] <item>
...

Total: 3 items, 1 item done

```

## Problem
- data file should not upload
- unit test: commander function test, file read/write **sync**, but not use astnc/promise/callback
- TDD use
- work flow: win -> git <- linux -> docker image <------ CI
- Dockefile, git commands, shell script
- 错误处理
- 编号、标号
