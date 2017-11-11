# Common Functions

> This document is part of the [App Framework Documentation](../../README_V2.md#documentation)

The file **scripts/common.js** provided obligatory helper functions and values for the scripts.

## Runtime information

- [ ] `os` - Current operating system (*mac*, *win* or *linux*)
- [ ] `mode` - Current runtime mode (*development* or *production*)
- [ ] `installed` - App Framework is cloned (*false*) or installed as a module (*true*)

## Configuration
- [ ] `cfg.proj` - Contains app project **package.json** file
- [ ] `cfg.app` - Contains app **config.json** file
- [ ] `cfg.pkg` - Contains App Framework **package.json** file
- [ ] `cfg.scripts` - Contains App Framework scripts **config.json** file

## Absolute paths

- [ ] `path.proj(...args)` - With app project folder as root
- [ ] `path.app(...args)` - With app folder as root
- [ ] `path.pkg(...args)` - With App Framework package folder as root
- [ ] `path.scripts(...args)` - With App Framework scripts folder as root
- [ ] `path.client(...args)` - With App Framework client folder as root
- [ ] `path.cache(...args)` - With App Framework cache folder as root
- [ ] `path.npm(...args)` - With Node modules folder as root
- [ ] `path.bin(...args)` - With Node modules bin folder as root

## Relative path

- [ ] `path.rel(from, to)` - Relative path between two folders

## Script execution

- [ ] `cmd(workingDirectory, commands, onSuccess, onError)` - To run a child process

## Logging

- [ ] `log.progress(...input)` - To log the progress to the console (input is transformed to JSON)
- [ ] `log.error(...input)`- To log a warning to the console
- [ ] `log.error(...input)` - To log an error to the console and exit the script with status code 1
- [ ] `log.issue(...input)` - To log an error to the console, ask to create and issue and exit the script with status code 1
- [ ] `log.exit(...input)` - To log the progress to the console and exit the script with status code 0
- [ ] `log.debug(...input)` - To log the progress to the console only for app configuration `"debug": true`
