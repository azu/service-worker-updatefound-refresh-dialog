# service-worker-updatefound-refresh-dialog [![Build Status](https://travis-ci.org/azu/service-worker-updatefound-refresh-dialog.svg?branch=master)](https://travis-ci.org/azu/service-worker-updatefound-refresh-dialog)

Show refresh dialog/banner when the service worker found updated.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install service-worker-updatefound-refresh-dialog

Or

Load from [unpkg.com](https://unpkg.com/)

- UMD: https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js
- mjs: https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.mjs

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
<script src="https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js"></script>
<script>
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/mock/sw.js')
            .then(function(registration) {
                serviceWorkerUpdatefoundRefreshDialog.register(registration);
            });
    });
</script>
</body>
</html>
```

### Options

- `message`: Custom message
- `onClick`: onClick handler for dialog
- `forceUpdate`: force show updated UI for debug

``js
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/mock/sw.js')
            .then(function(registration) {
                serviceWorkerUpdatefoundRefreshDialog.register(registration, {
                    message: "Custom Message",
                    onClick: (registration) => {
                        if (!registration.waiting) {
                            return;
                        }
                        registration.waiting.postMessage("skipWaiting");
                    }
                });
            });
    });
``

## Changelog

See [Releases page](https://github.com/azu/service-worker-updatefound-refresh-dialog/releases).

## Running tests

Install devDependencies and Run `npm test`:

    yarn test

Interactive mode

    yarn test:dev

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/service-worker-updatefound-refresh-dialog/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
