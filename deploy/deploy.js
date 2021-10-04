
console.log("Deploying to prod...")
const {v4: uuidv4} = require('uuid');
const ghpages = require('gh-pages');
ghpages.publish('../app', {
  src: ['./*.js', './*.json', './res/**', './routes/**', './build/**'],
  message: 'Deployed NetWatch: ' + uuidv4(),
  branch: 'prod',
  repo: 'git@github.com:michaelkoohang/NetWatch-Web.git'
}, function(err) {
  console.log(err);
});