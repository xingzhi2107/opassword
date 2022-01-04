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
$ npm install -g opass-cli
$ opass COMMAND
running command...
$ opass (-v|--version|version)
opass-cli/1.0.6 linux-x64 node-v14.17.3
$ opass --help [COMMAND]
USAGE
  $ opass COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opass help [COMMAND]`](#opass-help-command)
* [`opass import [FILE]`](#opass-import-file)
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

## `opass import [FILE]`

import password infos from json

```
USAGE
  $ opass import [FILE]

EXAMPLE
  $ opass import test.json
```

## `opass login`

login

```
USAGE
  $ opass login

EXAMPLE
  $ opass login
```

## `opass new`

new password info

```
USAGE
  $ opass new

EXAMPLE
  $ opass new
```

## `opass search [KEYWORD]`

search password info

```
USAGE
  $ opass search [KEYWORD]

OPTIONS
  -c, --[no-]cache  use cache

EXAMPLE
  $ opass search google
```

## `opass set-gpg-key [KEY]`

Set gpg key

```
USAGE
  $ opass set-gpg-key [KEY]

EXAMPLE
  $ opass set-gpg-key 1234
```

## `opass view-gpg-key`

View gpg key

```
USAGE
  $ opass view-gpg-key

EXAMPLE
  $ opass view-gpg-key
```
<!-- commandsstop -->

## Change log

* v1.0.2 基本流程
* v1.0.3 修复search命令不能清除缓存
* v1.0.4 新命令import
* v1.0.5 优化search命令的prompt的文本，显示更多的信息
