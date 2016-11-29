<p align="center">
  <img src="assets/img/magister-tools.png" alt="Magister Tools Logo">
  <br/><br/>
</p>
<p align="center">
   Makes getting grades and other data from <a href="http://www.schoolmaster.nl/">Magister</a> easier. <br>
  Uses <a href="https://github.com/simplyGits/MagisterJS">Magister.js</a> Written in <a href="https://nodejs.org/">NodeJS</a>.
</p>

---
# intro
The goal of this module is to make getting grades and other data from magister easier. Getting grades from <a href="http://www.schoolmaster.nl/">Magister</a> using <a href="https://github.com/simplyGits/MagisterJS">Magister.js</a> (v1) is a mess in my opinion. For my personal use I needed a way to get the average grades of students and this module does just that.

I am open to **any** [suggestions](#suggestions).

## Contents
* [Installation](#installation)  
* [Example usage](#example-usage)  
* [Documentation](#documentation)
 * [magisterLogin()](#magisterloginsettings-callback-dofirst)
 * [fetchCurrentCourse()](#fetchcurrentcoursemagisterlogin-callback)
 * [fetchGrades()](#fetchgradescourse-callback)
 * [selectEndGrades()](#selectendgradesgrades-settings)
* [Suggestions](#suggestions)  
* [License & Disclaimer](#license--disclaimer)  

---

# Installation
## Using npm:
Install the npm package
```
npm install magister-tools
```
## Cloning github source code:
1: Clone the source code.  
```
git clone https://github.com/skillzzjesse/magister-tools.git
```
2: install the dependencies.  
```
npm install
```
3: Profit??

# Example usage
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
         var endgrades = magister_tools.selectEndGrades(grades);

         /*=======================================================
           ******************************************************
               Now do whatever you want with these endgrades.
           ******************************************************
           =======================================================*/
      })
   })
}, function () {
   // What to do before logging in to Magister.
   // This is optional but can be useful, for example:
   // log something to the console indicating you're trying to login.
});
```

## Or use the (new) shortcut function
```js
var  magister_tools = require('magister-tools');

var login = {
  school: 'xxxx' || {url: 'xxxx'},
  username: 'xxxx',
  password: 'xxxx'
}

magister_tools.fetchEndGrades(login, function (err, endGrades) {
  if (err) {
    // Handle the error
  }

  /* Do something with the endGrades, for example log them */
  console.log(endGrades);

}, function () {
  // What to do before logging in to Magister.
  // This is optional but can be useful, for example:
  // log something to the console indicating you're trying to login.
})
```
---

# Documentation
**Contents**
 * [magisterLogin()](#magisterloginsettings-callback-dofirst)
 * [fetchCurrentCourse()](#fetchcurrentcoursemagisterlogin-callback)
 * [fetchGrades()](#fetchgradescourse-callback)
 * [selectEndGrades()](#selectendgradesgrades-settings)  

**Shortcut functions**
 * [fetchEndGrades()]()

---

<a name="magisterLogin
This function logs into magister using MagisterJS."></a>

### magisterLogin(settings, callback[, doFirst])
This function logs into magister using MagisterJS.  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | An object containing the data needed to login to magister. |
| callback | <code>function</code> | A callback function taking two parameters. -> err, magisterlogin |
| doFirst | <code>optional function</code> | A function the program needs to excecute before trying to login to Magister. For instance: logging something to the console indicating we're trying to log in. **This is optional**|

<a name="fetchCurrentCourse
This function fetches the current course for the logged in user."></a>

### fetchCurrentCourse(magisterlogin, callback)
This function fetches the current course for the logged in user.  

| Param | Type | Description |
| --- | --- | --- |
| magisterlogin | <code>?</code> | magisterlogin. (pass in magisterlogin from the callback of the magisterLogin method) |
| callback | <code>function</code> | A callback function taking two parameters. -> err, currentcourse |

<a name="fetchGrades
This function fetches the grades for the course of the logged in user."></a>

### fetchGrades(course, callback)
This function fetches the grades for the course of the logged in user.    

| Param | Type | Description |
| --- | --- | --- |
| course | <code>Array</code> | course: A Course (like: 4 VWO E/M 14-15) (You can get the courses from MagisterJS) |
| callback | <code>function</code> | A callback function taking two parameters. -> err, grades |

<a name="selectEndGrades
This function selects the endgrades from a list of grades."></a>

<a name="selectEndGrades
This function selects the endgrades from a list of grades."></a>

### selectEndGrades(grades[, settings])
This function selects the endgrades from a list of grades. ⇒ <code>Object</code>   
**Returns**: <code>Object</code> - endgrades An object structured like this:  

```js
{ class: endGrade }
// For example (with default settings)
{EN: 7.9, WB: 6.5}  
```

| Param | Type | Description |
| --- | --- | --- |
| grades | <code>Array</code> | A list of all the grades (generated by MagisterJS) |
| settings | <code>Object</code> | (OPTIONAL) Settings determining the functions behavior and output. |
| settings.fullClassName | <code>Boolean</code> | If the function should use the full class name or the class abbreviation.  (DEAFAULT: false) |
| settings.gradeToNumber | <code>Boolean</code> | If the function should convert the grade to a JS number or leave it a string.  (DEAFAULT: true) |

---

# Shortcut functions
The Goal of this module is to write less and do more! The normal way you would use this module will result in quite a lot of code still.
See the [example](#example-usage).  
Shortcut functions allow you to write even less code and still get the desired results.

---

### fetchEndGrades(settings, callback[, doFirst])
This function fetches the endgrades from magister for a specified user.

**Note that** this is a shortcut function designed to make using this
module just a little easier.  
However, it has less customizability since the function will use default
settings in the selectEndGrades function.  
Also tracking where an error occurred while getting the data from Magister
isn't possible.  

**Returns**: <code>Object</code> - endgrades An object structured like this: (**Note that** it will return via the callback)  

```js
{ class: endGrade }
// For example (with default settings)
{EN: 7.9, WB: 6.5}  
```

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | An object containing the data needed to login to magister. |
| callback | <code>function</code> | A callback function taking two parameters -> err, endgrades. |
| doFirst | <code>function</code> | (OPTIONAL) A function the program needs to execute before trying to login to Magister. For instance: logging something to the console indicating we're trying to log in. |


---

# Suggestions
This module is in a very early state and does not have a lot of functionality yet. Any suggested features are more than welcome.
If you have an awesome feature in mind please [open an issue](https://github.com/skillzzjesse/magister-tools/issues/new).

# License & Disclaimer
This module is open-sourced under the MIT Licence (see [LICENSE](LICENSE) for the full license). So within some limits, you can do with the code whatever you want.

The software is provided as is. It might work as expected - or not. Just don't blame me.
