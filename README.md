<h1 align="center">magister-tools</h1>
<p align="center">
   Makes getting grades and other data from <a href="http://www.schoolmaster.nl/">Magister</a> easier. <br>
  Uses <a href="https://github.com/simplyGits/MagisterJS">Magister.js</a> Written in <a href="https://nodejs.org/">NodeJS</a>.
</p>

---

# Installation
Install the npm package
#### Using npm:
```
npm install magister-tools 
```
#### Cloning github source code:
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
<a name="magisterLogin
This function logs into magister using MagisterJS."></a>

### magisterLogin
This function logs into magister using MagisterJS.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | An object containing the data needed to login to magister. |
| input | <code>function</code> | A callback function taking two parameters. -> err, magisterlogin |
| optional | <code>function</code> | A function the program needs to excecute before trying to login to Magister. For instance: logging something to the console indicating we're trying to log in. |

<a name="fetchCurrentCourse
This function fetches the current course for the logged in user."></a>

### fetchCurrentCourse
This function fetches the current course for the logged in user.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>?</code> | magisterlogin. (pass in magisterlogin from the callback of the magisterLogin method) |
| input | <code>function</code> | A callback function taking two parameters. -> err, currentcourse |
 
<a name="fetchGrades
This function fetches the grades for the course of the logged in user."></a>

### fetchGrades
This function fetches the grades for the course of the logged in user.    

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Array</code> | course: A Course (like: 4 VWO E/M 14-15) (You can get the courses from MagisterJS) |
| input | <code>function</code> | A callback function taking two parameters. -> err, grades |

<a name="getEndGrades
This function selects the endgrades from a list of grades."></a>

### getEndGrades
This function selects the endgrades from a list of grades. ⇒ <code>Object</code>  
**Returns**: <code>Object</code> - output An object structured like this:  
```js
 { subject: endGrade }
  // For instance...
  { en: '7.1', wb: '6.6', //etc....}  
```
| Param | Type | Description |
| --- | --- | --- |
| input | <code>Array</code> | A list of all the grades (generated by MagisterJS) |

---

# License & Disclaimer
This module is open-sourced under the MIT Licence (see [LICENSE](LICENSE) for the full license). So within some limits, you can do with the code whatever you want.

The software is provided as is. It might work as expected - or not. Just don't blame me.
