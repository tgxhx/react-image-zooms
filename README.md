# react-image-zooms

> A click on the react component of the zoom in image [Demo](https://tgxhx.github.io/react-image-zooms/)

[![npm version](https://badge.fury.io/js/react-image-zooms.svg)](https://badge.fury.io/js/react-image-zooms)
[![npm version](https://img.shields.io/npm/dm/react-image-zooms.svg)](https://npmjs.org/package/react-image-zooms)

## Installation

```bash
npm i -S react-image-zooms
```

## Usage

You need to limit the width and height of the image, it's recommended to use a sized container wrapper component.

```css
.image-box {
  width: 200px;
  height: 200px;
}

.image-box img {
  width: 100%;
  height: 100%;
}
```

```javascript
import ImageZooms from 'react-image-zooms';
import 'react-image-zooms/lib/image-zooms.css';

<div className="image-box">
  <ImageZooms src="some image url" duration={300} imageBoxSize={600} />;
</div>;
```

## Props

You may want to specify props:

- `src`: `required` - online image url
- `duration`: `optional` - zoom in image takes time, `default: 300`
- `imageBoxSize`: `optional` - the maximum width and height of the enlarged image, `default:500`

## License

Licensed under [MIT](https://opensource.org/licenses/mit-license.php) license.
