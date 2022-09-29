# bruker-afm

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Convert bruker afm images.

## Installation

`$ npm i bruker-afm`

## Usage

```js
import library from 'bruker-afm';

const result = library(args);
// result is ...
```

## Findings

I found multiple sources of knowledge about this file format, but not enough to use the data that we have.

[ForceVolume AFM Format](https://www.nanophys.kth.se/nanolab/afm/icon/bruker-help/Content/ForceVolume/ForceVolImgFileFormat.htm) Gives some information about the header for version 0x41XXXXXX

[Nanoscope repository](https://github.com/jmarini/nanoscope) Python implementation for versions 0x05120130 and 0x09300201 only

[pySPM repository](https://github.com/scholi/pySPM) Python implementation of multiple file format parsers, needed some tinkering to work with our data and still didn't provide acceptable results

[afmr repository](https://github.com/will-r-chase/afmr/) R implementation for AFM maps, didn't look too much into it because it didn't seem relevant

[Prof. Srin Manne's AFM lab](http://www.physics.arizona.edu/~smanne/DI/software/v43header.html) Provides informations as to how the data should be parsed, the most useful source so far

## [API Documentation](https://image-js.github.io/bruker-afm/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/bruker-afm.svg
[npm-url]: https://www.npmjs.com/package/bruker-afm
[ci-image]: https://github.com/image-js/bruker-afm/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/image-js/bruker-afm/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/image-js/bruker-afm.svg
[codecov-url]: https://codecov.io/gh/image-js/bruker-afm
[download-image]: https://img.shields.io/npm/dm/bruker-afm.svg
[download-url]: https://www.npmjs.com/package/bruker-afm
