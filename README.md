# binance-cryptocurrency-widget

> test task for Binance

Task: https://github.com/orangeflame/binance-fe-test

Pros: 
- Extra low size (nearly 3Kb)
- Blazing fast
- Made as npm package

Cons: 
- Used store based on context API instead of Redux (for size purpose)
- Lack of readability

[![NPM](https://img.shields.io/npm/v/binance-cryptocurrency-widget.svg)](https://www.npmjs.com/package/binance-cryptocurrency-widget) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

Example deployed on gh-pages https://travnikov.dev/binance-cryptocurrency-widget/

## Install

```bash
npm install --save binance-cryptocurrency-widget
```

## Usage

```tsx
import React, { Component } from 'react'

import BinanceWidget from 'binance-cryptocurrency-widget'
import 'binance-cryptocurrency-widget/dist/index.css'

class Example extends Component {
  render() {
    return <BinanceWidget />
  }
}
```

## License

MIT © [TravnikovRN](https://github.com/TravnikovRN)
