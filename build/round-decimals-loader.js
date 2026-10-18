// Rounds decimals in compiled Sass to 5 places, matching node-sass's default precision.
// Dart Sass writes 10 places (e.g. Bootstrap's line-height 1.428571429 instead of 1.42857),
// which shifts text by sub-pixel amounts and changes how the popup renders.
module.exports = function roundDecimals(css, map) {
  const rounded = css.replace(/(?<![\w.#-])(\d*)\.(\d{6,})/g, (match, int, frac) => {
    let out = Number(`${int || '0'}.${frac}`).toFixed(5).replace(/\.?0+$/, '');
    if (!int) out = out.replace(/^0(?=\.)/, '');
    return out;
  });
  this.callback(null, rounded, map);
};
