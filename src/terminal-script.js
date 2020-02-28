// https://kirkhammetz.github.io/termly.js/

const shellFileSystem = {
  home: {
    'Documents': {
      'guide.md': 'This is where we would write a helpful text or something!',
      'password.txt': `It's not going to be THAT easy`,
    }
  }
};

const shellCommands = {
  help: {
    name: 'help',
    type: 'builtin',
    man: 'List of available commands\nType man <command> to have further info.',
    fn: function help() {
      return `Commands available: ${Object.keys(this.shell.ShellCommands).join(', ')}\nType "man <command>" to have further info.`
    }
  },

  whoami: {
    name: 'whoami',
    type: 'builtin',
    man: 'Current user',
    fn: function whoami() {
      return this.shell.env.USER
    },
  },

  about: {
    name: 'about',
    type: 'builtin',
    man: 'About this project',
    fn: function about() {
      let str = ''
      str += `name: ${name}\n`
      str += `version: ${version}\n`
      str += `description: ${description}\n`
      str += `repository: ${repository}\n`
      str += `author: ${author}\n`
      str += `license: ${license}\n`
      return str
    }
  },

  pwd: {
    name: 'pwd',
    type: 'builtin',
    man: 'Print current working directory',
    fn: function about() {
      return this.shell.fs.getCurrentDirectory()
    }
  },

  cd: {
    name: 'cd',
    type: 'builtin',
    man: 'Change directory, pass absolute or relative path: eg. cd /etc, cd / cd/my/nested/dir',
    fn: function cd(argv) {
      if (!argv['_'].length) throw new Error('-invalid No path provided.')
      const path = argv['_'].join()
      try{
        return this.shell.fs.changeDir(path)
      } catch(e) {
        throw e
      }
    }
  },

  ls: {
    name: 'ls',
    type: 'builtin',
    man: 'list directory files, pass absolute/relative path, if empty list current directory',
    fn: function ls(argv = { _: ['./'] } ) {
      if (!argv['_'].length) argv['_'].push('.')
      let path = argv['_'].join()
      let list, responseString = ''
      try{
        list = this.shell.fs.listDir(path)
      } catch(e) {
        throw e
      }
      for (let file in list) {
        if (list.hasOwnProperty(file)) {
          responseString += `${list[file].permission}\t${list[file].user} ${list[file].group}\t${list[file].name}\n`
        }
      }
      return responseString
    }
  },

  cat: {
    name: 'cat',
    type: 'builtin',
    man: 'Return file content, take one argument: file path (relative/absolute)',
    fn: function(argv = { _: ['./'] } ) {
      let path = argv['_'].join()
      let file, responseString = ''
      try{
        file = this.shell.fs.readFile(path)
      } catch(e) {
        throw e
      }
      return file.content
    }
  },

  man: {
    name: 'man',
    type: 'builtin',
    man: 'Command manual, takes one argument, command name',
    fn: function man(args = {}) {
      if (!args['_'][0]) throw new Error('man: no command provided.')
      let command = args['_'][0]
      if (!this.shell.ShellCommands[command]) throw new Error('command doesn\'t exist.')
      if (!this.shell.ShellCommands[command].man) throw new Error('no manual entry for this command.')
      return this.shell.ShellCommands[command].man
    },
  },

  logout: {
    name: 'logout',
    type: 'usr',
    man: "Disconnect's user from terminal connection",
    fn: function logout() {
      return 'Whoops!'
    }
  }
};

var shellEnv = {
  USER: "none",
  HOSTNAME: "terminal-5281",
};

const shellOptions = {
  filesystem: shellFileSystem,
  commands: shellCommands,
  env: shellEnv,
};
