/* jshint -W104, -W033 */

const test = require('tape')
const loadGoogleApi = require('./')

test('resolves the promise to the `gapi` object', function (t) {
  t.plan(1)
  loadGoogleApi().then(function (googleApi) {
    t.true(typeof googleApi.load === 'function')
  }, t.fail)
})

test('resolves the promise to the `gapi` object, with support for duplicate calls', function (t) {
  t.plan(2)
  const promises = [loadGoogleApi(), loadGoogleApi()]
  Promise.all(promises).then(function (values) {
    t.equal(values[0], values[1])
    t.true(typeof values[0].load === 'function')
  }, t.fail)
})
