# google-api-loader [![npm Version](https://badgen.net/npm/v/google-api-load)](https://www.npmjs.org/package/google-api-load) [![Build Status](https://badgen.net/travis/wooyey/google-api-load?label=build)](https://travis-ci.org/wooyey/google-api-load) [![Bundle Size](https://badgen.net/bundlephobia/minzip/google-api-load)](https://bundlephobia.com/result?p=google-api-load)

> A thin, [Promise](https://developers.google.com/web/fundamentals/primers/promises)-returning helper for loading the [Google JavaScript API](https://developers.google.com/maps/documentation/javascript/).

This work is totaly based on [load-google-maps-api](https://github.com/yuanqing/load-google-maps-api), just needed something like that for GAPI client, nothing more, sorry ;)

- The Promise’s fulfilled callback is passed the `gapi` object
- Optionally set a timeout, an API key, the language, [and more](#googleapioptions)

## Usage

Example using `import`:

```js
import loadGoogleApi from 'google-api-load'

loadGoogleApi().then(function (gapi) {
  gapi.load('client:auth2', function () {
    console.log('client:auth2 library has been loaded')
  })
})
```

## Why

Need to use Google API with [Webpack](https://webpack.github.io/) in better way ...  such as [load-google-maps-api](https://github.com/yuanqing/load-google-maps-api)

## API

```js
const loadGoogleApi = require('google-load-api')
```

### GoogleApi([options])

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

- **Fulfilled** if loading was successful. The fulfilled callback is passed the `gapi` object. If `loadGoogleApi` is called multiple times on a page, the fulfilled callback will be passed the previously-loaded `gapi` object.
- **Rejected** if we weren’t able to load the Google API after `options.timeout`.

See [Usage](#usage).

`options` is an optional object literal:

  Key | Description | Default
  :--|:--|:--
  `timeout` | Time in milliseconds before rejecting the Promise | `10000`

## Installation

```sh
$ yarn add google-api-load
```

## License

[MIT](LICENSE.md)
