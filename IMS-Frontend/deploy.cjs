const path = require('path');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// FTP deployment configuration
const config = {
  host: 'ftp.harshadsatasiya.com',
  port: 21,
  user: 'capstone@harshadsatasiya.com',
  password: 'CapstoneProject',
  localRoot: path.join(__dirname, 'dist'),
  remoteRoot: 'public_html/capstone',
  include: ['*', '**/*'],
  exclude: ['**/*.map', 'node_modules/**', 'node_modules/**/.*', '.git/**'],
  deleteRemote: false,
  forcePasv: true
};


// Deploy the files
ftpDeploy.deploy(config)
  .then(res => console.log('Deployment finished:', res))
  .catch(err => console.error('Deployment error:', err));

