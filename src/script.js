$(function() {
  const shellFileSystem = {
    home: {
      'Documents': {
        'guide.md': 'This is where we would write a helpful text or something!',
        'password.txt': `It's not going to be THAT easy`,
      }
    }
  };
  
  const shellCommands = {

  };

  const shellEnv = {
    USER: "guest",
    HOSTNAME: "terminal-5281",
  };
  
  const shellOptions = {
    filesystem: shellFileSystem,
    commands: shellCommands,
    env: shellEnv,
  };
  
  const shell = new TermlyPrompt('#shell-container', shellOptions);
});
