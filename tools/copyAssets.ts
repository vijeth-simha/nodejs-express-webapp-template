var shell = require('shelljs');

// Copy all the view templates
shell.cp( "-R", "./views", "dist/" );
shell.cp( "-R", "./public", "dist/" );