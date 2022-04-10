
function color2Hex(color) {
	return Math.round(color).toString(16).padStart(2, "0");
}

var visited = Symbol('visited');

module.exports = function(opts) {
	opts = opts || {};
	var ieOnly = opts.ieOnly;
	return {
		postcssPlugin: 'postcss-filter-background',
		Declaration(node, { Declaration, AtRule }) {
			// ignore nodes we already visited
			if (node[visited]) {
				return;
			}
			if (node.prop == "background" || node.prop == "background-color") {
				var colors = /^\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)\s*$/.exec(node.value);
				if (colors) {
					if (colors) {
						// https://en.wikipedia.org/wiki/RGBA_color_space
						var alpha = color2Hex(colors[4] * 255);
						var colorR = color2Hex(colors[1]);
						var colorG = color2Hex(colors[2]);
						var colorB = color2Hex(colors[3]);
						var gradientColor = '#' + alpha + colorR + colorG + colorB;
						var value = "progid:DXImageTransform.Microsoft.gradient(StartColorStr='" + gradientColor + "', EndColorStr='" + gradientColor + "', GradientType=0)";
						if (ieOnly) {
							node.value = value;
							node.prop = "filter";
						} else {
							var level1 = node;
							while (true) {
								var parent=level1.parent;
								if(!parent || parent.type=="root"){
									break ;
								}
								level1 = parent;
							}
							var atRule = new AtRule({
								name: 'media',
								params: "(min-width: 0)"
							});
							var rule = node.parent.clone({
								nodes: []
							});
							var decl = node.clone();
							// mark nodes as visited by us
							decl[visited] = true;

							rule.append(decl);
							atRule.append(rule);
							level1.after(atRule);

							atRule = new AtRule({
								name: 'media',
								params: "\\0screen\\,screen\\9"
							});
							rule = node.parent.clone({
								nodes: []
							});
							decl = new Declaration({ prop: 'filter', value: value });
							rule.append(decl);
							atRule.append(rule);
							level1.after(atRule);

							node.remove();
						}
					}
				}
			}
		}
	};
};
module.exports.postcss = true;
