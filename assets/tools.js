/**
 * Magister Tools v1.0.0
 * https://git.io/vX4KY
 *
 * Copyright 2016 Jesse van der Pluijm
 * Licensed under MIT (https://git.io/magister-tools-license)
 *
 * This file is where some usefull tools used in the main module live.
 */

 /* ============================
          Tools module:
    ============================*/
    module.exports = {
      /** ======================================================================
       * @name toNumber
       * This function converts a string to a JavaScript Number.
       * Commas Will be replaced by dots.
       * @param {String} string The string that's being converted to a number.
       * @returns {Number} number This string converted into a JavaScript number.
       */
      toNumber: function (string) {
        return Number(string.replace(',', '.'));
      }
    }
