# chrome-extensions-id

Get chrome extensions id from a crx file

## Install

```
$ npm install chrome-extensions-id
```

## Usage with cli

```
$ cei path/to/file.crx
```

## Usage with nodejs

```js
const cei = require('chrome-extensions-id');

cei('path/to/file.crx').then(console.log);
```

## Related

-   [node-chrome-extension-id](https://github.com/shyiko/node-chrome-extension-id)
-   [node-crx-parser](https://github.com/shyiko/node-crx-parser)

## License

MIT © [Harvey Zack](https://sleepy.im/)
