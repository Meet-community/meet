const commands = {
  Heroku: {
    'cli-api-production': 'Connect to api production logs',
    'cli-front-production': 'Connect to frontend production logs',
    'cli-api-development': 'Connect to api production logs',
    'cli-front-development': 'Connect to frontend production logs',
    'heroku-remote-add': 'Add remote branches for production',
    'heroku-remote-add-dev': 'Add remote branches for development',
    'deploy-production': 'Deploy app to production',
    'deploy-dev': 'Deploy app to development',
  },

  App: {
    'i-all': 'install all app dependencies',
    'lint': 'lint app files',
    'api': 'run api',
    'frontend': 'run frontend',
    'dev': 'run api and dev',
    'dev-windows': 'run api and dev on windows'
  }
}

Object.entries(commands).forEach(([topicName, commandsList]) => {
  console.log(`\n ___${topicName} \n`);

  const commands = Object.entries(commandsList);

  commands.forEach(([command, description]) => (
    console.log(`$ ${command} - ${description}`)
  ))
})
