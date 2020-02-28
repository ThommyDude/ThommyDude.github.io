$(function() {
  var on = false;
  var shell;
  
  $('#power').on('click', function(e) {
    if (!on) {
      on = true;
      if (!shell) {
        shell = new TermlyPrompt('#shell-container', shellOptions);
      }
      $('#shell-container').addClass('on');
    }
    else {
      on = false;
      shell = false;
      $('#shell-container')
        .removeClass('on')
        .empty()
      ;
    }
  });

  function checkAuth(user, command) {
    // 'help', 'whoami', 'man', 'about', 'pwd', 'arguments', 'printenv', 'export', 'cd', 'ls', 'cat', 'http'
    // 'login', 'logout'
    
    switch(user) {
      case 'none':
        $commands = ['help', 'whoami', 'man', 'login'];
        break;
      
      case 'guest':
        $commands = ['help', 'whoami', 'man', 'logout', 'cat', 'ls', 'cd'];
        break;

      case 'admin':
        $commands = ['help', 'whoami', 'man', 'logout'];
        break;

      case 'steves':
        $commands = [];
        break;

      default:
        $commands = [];
        break;
    }

    if ($commands.includes(command)) {
      return true;
    }

    return false;
  }
});
