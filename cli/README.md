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
opassword-cli/0.0.1 darwin-x64 node-v14.16.1
$ opass --help [COMMAND]
USAGE
  $ opass COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opass hello [FILE]`](#opass-hello-file)
* [`opass help [COMMAND]`](#opass-help-command)

## `opass hello [FILE]`

describe the command here

```
USAGE
  $ opass hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ opass hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/xingzhi2107/opassword/blob/v0.0.1/src/commands/hello.ts)_

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
<!-- commandsstop -->
