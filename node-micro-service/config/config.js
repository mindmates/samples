
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/hourglass',
    root: rootPath,
    tokenConfPath:path.join(rootPath+'/config/dev_jwt.properties'),
    messagesConfPath:path.join(rootPath+'/config/messages.properties'),
    stormPath:{
      apiKeyId:'567P0MDMQD1E6QGZ4VGTJ7J6Z',
      apiSecretId:'Df2hekYFaR2MsW1rjie/9WHUIMYuWS3oiNIK0WUJIDA',
      applicationHref:'https://api.stormpath.com/v1/applications/6T4U5oPUH16PnWTn1Hyipo'
    }
   },
  test: {

  },
  production: {

  }
};
