<h1 align="center">magister-tools</h1>
<p align="center">
   Makes getting grades and other data from <a href="http://www.schoolmaster.nl/">Magister</a> easier. <br>
  Uses <a href="https://github.com/simplyGits/MagisterJS">Magister.js</a> Written in <a href="https://nodejs.org/">NodeJS</a>.
</p>

---

## Installation
Install the npm package
```
npm install magister-tools 
```

## Basic usage 
```js
var magister_tools = require('magister-tools');

magister_tools.magisterLogin({
   school: 'xxxx' || {url: 'xxxx'},
   username: 'xxxx',
   password: 'xxxx'
}, function (err, magisterlogin) {
   // This is the callback function. 
   // What to do when logged in to Magister
}, function () { 
   // What to do before loggin in to Magister.
   // This is optional but can be usefull, for example: 
   // log something to the console indicating you're trying to login.
});
```

