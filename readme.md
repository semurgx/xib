# xib
> Basic terminal styling

- No dependencies
- Doesn't extend String.prototype
- Tag string literal based syntax

## Installation
```console
$ npm install xib
```

## Usage
```js
const xib = require('xib');

console.log(xib.bold.green.yellowBackground`Hello, world!`)
```

## Styles

### Modifiers

- `.reset`
- `.bold`
- `.dim`
- `.italic` (usually not supported)
- `.underline`
- `.blink`
- `.inverse`
- `.hidden`
- `.strikethrough` (usually not supported)

### Colors

- `.black`
- `.red`
- `.green`
- `.yellow`
- `.blue`
- `.magenta`
- `.cyan`
- `.white`
- `.gray` (aka `.grey` or `.brightBlack`)
- `.brightRed`
- `.brightGreen`
- `.brightYellow`
- `.brightBlue`
- `.brightMagenta`
- `.brightCyan`
- `.brightWhite`

### Background colors

- `.blackBackground`
- `.redBackground`
- `.greenBackground`
- `.yellowBackground`
- `.blueBackground`
- `.magentaBackground`
- `.cyanBackground`
- `.whiteBackground`
- `.grayBackground` (aka `.greyBackground` or `.brightBlackBackground`)
- `.brightRedBackground`
- `.brightGreenBackground`
- `.brightYellowBackground`
- `.brightBlueBackground`
- `.brightMagentaBackground`
- `.brightCyanBackground`
- `.brightWhiteBackground`

## License

MIT
