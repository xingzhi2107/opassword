opassword-cli
=============

opassword命令行版本

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/opassword-cli.svg)](https://npmjs.org/package/opassword-cli)
[![Downloads/week](https://img.shields.io/npm/dw/opassword-cli.svg)](https://npmjs.org/package/opassword-cli)
[![License](https://img.shields.io/npm/l/opassword-cli.svg)](https://github.com/xingzhi2107/opassword/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g opassword-cli
$ opass COMMAND
running command...
$ opass (-v|--version|version)
opassword-cli/1.0.0 darwin-x64 node-v14.16.1
$ opass --help [COMMAND]
USAGE
  $ opass COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opass help [COMMAND]`](#opass-help-command)
* [`opass login`](#opass-login)
* [`opass new`](#opass-new)
* [`opass search [KEYWORD]`](#opass-search-keyword)
* [`opass set-gpg-key [KEY]`](#opass-set-gpg-key-key)
* [`opass view-gpg-key`](#opass-view-gpg-key)

## `opass help [COMMAND]`

display help for opass

```
USAGE
  $ opass help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `opass login`

login

```
USAGE
  $ opass login

EXAMPLE
  $ opass login
```

_See code: [src/commands/login.ts](https://github.com/xingzhi2107/opassword/blob/v1.0.0/src/commands/login.ts)_

## `opass new`

new password info

```
USAGE
  $ opass new

EXAMPLE
  $ opass new
```

_See code: [src/commands/new.ts](https://github.com/xingzhi2107/opassword/blob/v1.0.0/src/commands/new.ts)_

## `opass search [KEYWORD]`

search password info

```
USAGE
  $ opass search [KEYWORD]

OPTIONS
  -c, --cache  use cache

EXAMPLE
  $ opass search google
```

_See code: [src/commands/search.ts](https://github.com/xingzhi2107/opassword/blob/v1.0.0/src/commands/search.ts)_

## `opass set-gpg-key [KEY]`

Set gpg key

```
USAGE
  $ opass set-gpg-key [KEY]

EXAMPLE
  $ opass set-gpg-key 1234
```

_See code: [src/commands/set-gpg-key.ts](https://github.com/xingzhi2107/opassword/blob/v1.0.0/src/commands/set-gpg-key.ts)_

## `opass view-gpg-key`

View gpg key

```
USAGE
  $ opass view-gpg-key

EXAMPLE
  $ opass view-gpg-key
```

_See code: [src/commands/view-gpg-key.ts](https://github.com/xingzhi2107/opassword/blob/v1.0.0/src/commands/view-gpg-key.ts)_
<!-- commandsstop -->
