# PostCSS Opacity

[PostCSS](https://github.com/postcss/postcss) plugin to add gradient filter for IE to support rgba background.

## Example
```js
const postcssFilterBackground = require('postcss-filter-background');
postcss([
	postcssFilterBackground({
		ieOnly: false
	})
])
```

### ieOnly: false


```css
/* Input example */
.rgba-background {
	color: #000;
	background: rgba(0, 0, 255, .5);
}
```

```css
/* Output example */
.rgba-background {
	color: #000;
}
@media \0screen\,screen\9 {
	.rgba-background {
		filter: progid:DXImageTransform.Microsoft.gradient(StartColorStr='#800000ff', EndColorStr='#800000ff', GradientType=0);
	}
}
@media (min-width: 0) {
	.rgba-background {
		background: rgba(0, 0, 255, .5);
	}
}
```

### ieOnly: true
Support for Only IE 5-9

```js
const postcssFilterBackground = require('postcss-filter-background');
postcss([
	postcssFilterBackground({
		ieOnly: true
	})
])
```

```css
/* Input example */
.rgba-background {
	background: rgba(0, 0, 255, .5);
}
```

```css
/* Output example */
.rgba-background {
	filter: progid:DXImageTransform.Microsoft.gradient(StartColorStr='#800000ff', EndColorStr='#800000ff', GradientType=0);
}
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.
