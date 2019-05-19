/* jshint -W033, -W104 */

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
        const gapi = window.gapi
        // Make authentication here
        if ('auth' in options) {
          gapi.load('client:auth2', {
            callback: function () {
              let listener = options.auth.listener
              gapi.client.init(options.auth).then(
                function () {
                  if (!gapi.auth2.getAuthInstance()) {
                    console.error('client:auth2 failed to get auth instance')
                    return
                  }

                  // Adding listener
                  gapi.auth2.getAuthInstance().isSignedIn.listen(listener);

                  let isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
                  listener(isSignedIn)

                  // Sign in if not yet
                  if (!isSignedIn) {
                    gapi.auth2.getAuthInstance().signIn()
                  }
                }, function (error) {
                  console.error('client:auth2', error.details)
                }
              )
            },
            onerror: function () {
              console.error('client:auth2 failed to load!')
            },
            timeout: options.auth.timeout || 5000,
            ontimeout: function () {
              console.error('client:auth2 timeout when loading library')
            }
          })
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
