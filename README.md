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

## Example usage 
```js
var magister_tools = require('magister-tools');

magister_tools.magisterLogin({
   school: 'xxxx' || {url: 'xxxx'},
   username: 'xxxx',
   password: 'xxxx'
}, function (err, magisterlogin) {
   if (err) {
      // Handle error..
   }
   // This is the callback function. 
   // What to do when logged in to Magister.
   
   // Get the current course for the logged in user.
   magister_tools.fetchCurrentCourse(magisterlogin, function (err, course) {
      if (err) {
         // Handle error..
      }   
      // What to do when we have the current course for the logged in user.
      
      
      magister_tools.fetchGrades(course, function (err, grades) {
         if (err) {
            // Handle error...
         }
         // What to do when we've got the grades for the current course of the logged in user.
         
         // Select the endgrades (avarage grades) from this list of grades.
         var endgrades = magister_tools.getEndGrades(grades);
         
         /*=======================================================
           ******************************************************
               Now do whatever you want with these endgrades.
           ******************************************************
           =======================================================*/ 
      })
   })
}, function () { 
   // What to do before loggin in to Magister.
   // This is optional but can be usefull, for example: 
   // log something to the console indicating you're trying to login.
});
```
---

# Documentation
## **magisterLogin(settings, callback, doFirst)**  
> This function logs into magister using magisterJS.

* **settings** {Object} *input* // An object containing the data needed to login to magister.
* **callback** {Function} *input* // A callback function taking two parameters. -> err, magisterlogin
 * err // Any error that happened when trying to login to magister.
 * magisterlogin // (pass in `this` inside of .ready() using magisterJS)
* **doFirst** {Function} *optional* // A function the program needs to excecute before trying to login to Magister.
 * For instance: logging something to the console indicating we're trying to log in.

## fetchCurrentCourse(magisterlogin, callback)
> This function fetches the current course for the logged in user.

* **magisterlogin** {?} *input* // magisterlogin (pass in magisterlogin from the callback of the magisterLogin method)
* **callback** {Function} *input* // A callback function taking two parameters. -> err, course
 * err // Any error that happened when fetching current course.
 * course // A Course (like: 4 VWO E/M 14-15) (You can get the courses from magisterJS)
