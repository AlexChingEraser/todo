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

## stage2 - Multi-Users
some rules: 
- when user not login, todo can not use;
- default: root/root, alex/alex
- config file: ~/.todo-config
### login
```javascript
todo login -u user
Password: 

Login success!
```

### logout
```javascript
todo logout

Louout success!
```

## Problem
- data file should not upload
- unit test: commander function test, file read/write **sync**, but not use astnc/promise/callback
- TDD use
- work flow: win -> git <- linux -> docker image <------ CI
- Dockefile, git commands, shell script
- handle error
- node path route: chaos
