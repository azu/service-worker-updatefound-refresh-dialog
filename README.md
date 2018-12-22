# service-worker-updatefound-refresh-dialog [![Build Status](https://travis-ci.org/azu/service-worker-updatefound-refresh-dialog.svg?branch=master)](https://travis-ci.org/azu/service-worker-updatefound-refresh-dialog)

Show refresh dialog/banner when the service worker found updated.

![screen shot](./docs/screenshot.png)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install service-worker-updatefound-refresh-dialog

Or

Import from [unpkg.com](https://unpkg.com/):

- UMD: https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js
- mjs: https://unpkg.com/service-worker-updatefound-refresh-dialog?module

## Usage

You should inject refresh dialog script to two place.

- Your Page: `index.html`
- Your Service Worker: `sw.js`

**Add to your page**(index.html):

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
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                serviceWorkerUpdatefoundRefreshDialog.register(registration);
            });
    });
</script>
</body>
</html>
```

**Add to your service worker**(sw.js):

```js
// sw.js
importScripts("https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js");
```

### Options

- `message`: Custom message
- `onClick`: onClick handler for dialog
- `forceUpdate`: force show updated UI for debug

```js
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
```

## Style

Dialog's style use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
You can overwrite it by CSS Variables.

```css
  min-width: var(--sw-updatefound-refresh-dialog--min-width, 250px);
  color: var(--sw-updatefound-refresh-dialog--color, #fff);
  background-color: var(--sw-updatefound-refresh-dialog--background-color, #333);
  text-align: var(--sw-updatefound-refresh-dialog--text-align, center);
  border-radius: var(--sw-updatefound-refresh-dialog--border-radius, 2px);
  padding: var(--sw-updatefound-refresh-dialog--padding, 16px);
  position: var(--sw-updatefound-refresh-dialog--position, fixed);
  z-index: var(--sw-updatefound-refresh-dialog--z-index, 1);
  left: var(--sw-updatefound-refresh-dialog--left, initial);
  right: var(--sw-updatefound-refresh-dialog--right, 5%);
  top: var(--sw-updatefound-refresh-dialog--top, initial);
  bottom: var(--sw-updatefound-refresh-dialog--bottom, 30px);
```

For example, you can overwrite it by defining `--sw-updatefound-refresh-dialog--left`.

```html
<style>
    :root {
        --sw-updatefound-refresh-dialog--left: 0;
    }
</style>
```

## FAQ

### Does not refresh when click the banner

Do you forget to inject a script to service worker like `sw.js`?

```js
// sw.js
importScripts("https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js");
```

### `skipWaiting()` integration

If you already did `skipWaiting()` in sw.js, you should remove the code from sw.js

For example, workbox has `skipWaiting` and `clientsClaim`.
These method trigger `statechange` event of the service worker without asking the user to reload manually.

- [Skip Waiting and Clients Claim](https://developers.google.com/web/tools/workbox/modules/workbox-sw#skip_waiting_and_clients_claim)

```diff
// workbox init setting
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");
+ importScripts("https://unpkg.com/service-worker-updatefound-refresh-dialog/service-worker-updatefound-refresh-dialog.umd.js")

workbox.core.setCacheNameDetails({ prefix: "website-v1" });
workbox.googleAnalytics.initialize();
- workbox.skipWaiting();
- workbox.clientsClaim();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);
```

If you have called `skipWaiting` without asking the user to reload manually, this script do refresh page instantly.

- [javascript - Refresh page on controllerchange in service worker - Stack Overflow](https://stackoverflow.com/questions/41891031/refresh-page-on-controllerchange-in-service-worker)

## Resources

- [pwa-update-available/index.html at master · deanhume/pwa-update-available](https://github.com/deanhume/pwa-update-available/blob/master/index.html)
- [Advanced Recipes  |  Workbox  |  Google Developers](https://developers.google.com/web/tools/workbox/guides/advanced-recipes)


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
