/**
 * Magister Tools v1.0.0
 * https://git.io/vX4KY
 *
 * Copyright 2016 Jesse van der Pluijm
 * Licensed under MIT (https://git.io/magister-tools-license)
 *
 * This node.js module should make getting grades and other data from magister easier.
 */

/* ======================
 * Load our requirements.
 * ====================== */

/* magister.js itself*/
var Magister = require('magister.js')
/* Our tools */
var tools = require('./assets/tools.js');

/* ======================
 *   The actual module:
 * ====================== */
module.exports = {
  /** ==========================================================================
   * @name magisterLogin
   * This function logs into magister using magisterJS.
   * @param {Object} settings An object containing the data needed to login to magister.
   * @param {Function} callback A callback function taking two parameters. -> err, magisterlogin
   * @param {Function} dofirst (OPTIONAL) A function the program needs to excecute before trying to login to Magister.
   * For instance: logging something to the console indicating we're trying to log in.
   */
  magisterLogin: function (settings, callback, doFirst) {
    // If we need to do something before trying to log in we do it here.
    if (doFirst) doFirst();

    // try to login to magister using settings as login-data.
    try {
      var magisterlogin = new Magister.Magister(settings);
    } catch (err) {
      callback(err) //Early return to callback with the error
    }

    // Invoke the .ready function.
    magisterlogin.ready(function (err) {
      // Invoke callback when logged into magister. (if callback exists)
      if (callback) callback(err, this);
    });
  },

  /** ==========================================================================
   * @name fetchCurrentCourse
   * This function fetches the current course for the logged in user.
   * @param {?} magisterlogin (pass in `this` inside of .ready())
   * @param {function} callback A callback function taking two parameters. -> err, currentcourse
   */
  fetchCurrentCourse: function (magisterlogin, callback) {
    /* Fetch current course using the magisterlogin. */
    magisterlogin.currentCourse(function (err, currentcourse) {
      // Invoke callback when done and pass along any errors or the currentcourse
      // (If callback exists)
      if (callback) callback(err, currentcourse)
    });
  },

  /** ==========================================================================
   * @name fetchGrades
   * This function fetches the grades for the course of the logged in user.
   * @param {Array} course A Course (like: 4 VWO E/M 14-15) (You can get the courses from magisterJS)
   * @param {Function} callback A callback function taking two parameters. -> err, grades
   */
  fetchGrades: function (course, callback) {
    /* Fetch the grades using the course */
    course.grades(function (err, grades) {
      // Invoke callback when done and pass along any errors or the grades
      // (If callback exists)
      if (callback) callback(err, grades)
    });
  },

  /** ==========================================================================
   * @name getEndGrades
   * This function selects the endgrades from a list of grades.
   * @returns {Object} endgrades An object structured like this:
   * { class: endGrade }
   * // For example (with default settings)
   * {EN: 7.9, WB: 6.5}
   * @param {Array} grades A list of all the grades (generated by MagisterJS)
   * @param {Object} settings Settings determining the functions behavior and output.
   * @param {Boolean} settings.fullClassName If the function should use the full class name or the class abbreviation. (DEAFAULT: false)
   * @param {Boolean} settings.gradeToNumber If the function should convert the grade to a JS number or leave it a string. (DEAFAULT: true)
   */
   getEndGrades: function (grades, settings) {

     /* Set our settings or default them */
     if (!settings) settings = {};
     if (!settings.fullClassName) settings.fullClassName = false;
     if (!settings.gradeToNumber) settings.gradeToNumber = true;

     /* Filter the grades and add them to an object if needed. */
     var returnObj = {};
     grades.forEach(function (grade) {

       // If grade's type is average grade:
       if (grade.type().isEnd()) {

         /* Determine functions behavior based on the settings */
         // Determine the key of the return Object:
         if (settings.fullClassName) {
           // The key will be the full name of the class.
           var key = grade.class().description;
         } else {
           // The key will be the abbreviation of the class.
           var key = grade.class().abbreviation;
         }
         // Determine the grade type.
         if (settings.gradeToNumber) {
           // The grade will be converted to a number.
           var g = tools.toNumber(grade.grade())
         } else {
           // The grade will be default. (string)
           var g = grade.grade();
         }

         // Add value to the returnObj
         returnObj[key] = g;
       }
     })
     /* Returning */
     return returnObj;
   }
}
