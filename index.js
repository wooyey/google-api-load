/* jshint -W033 */

var CALLBACK_NAME = '__googleApiOnLoadCallback'

var promise = null

module.exports = function (options) {
  options = options || {}

  if (!promise) {
    promise = new Promise(function (resolve, reject) {
      // Reject the promise after a timeout
      var timeoutId = setTimeout(function () {
        window[CALLBACK_NAME] = function () { } // Set the on load callback to a no-op
        reject(new Error('Could not load the Google API'))
      }, options.timeout || 10000)

      // Hook up the on load callback
      window[CALLBACK_NAME] = function () {
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
        }
        resolve(window.gapi)
        delete window[CALLBACK_NAME]
      }

      // Prepare the `script` tag to be inserted into the page
      var scriptElement = document.createElement('script')
      scriptElement.src = 'https://apis.google.com/js/api.js'
      scriptElement.onload = window[CALLBACK_NAME]

      // Insert the `script` tag
      document.body.appendChild(scriptElement)
    })
  }

  return promise
}
