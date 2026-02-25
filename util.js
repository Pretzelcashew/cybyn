
export const wait = ms => new Promise(res => setTimeout(res, ms));

export const mod = (n, m) => ((n % m) + m) % m;

/**range excludes max number*/
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getAccessibiltyColor = (r, g, b) => {
    // 1. Normalize and apply Gamma Expansion to get Linear values
    const [rl, gl, bl] = [r, g, b].map(v => {
        let s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });

    // 2. Calculate Relative Luminance
    const L = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;

    // 3. Use the WCAG threshold for the best of Black vs White
    // This ensures a minimum 4.5:1 ratio (usually closer to 4.58:1)
    return L > 0.179 ? [0, 0, 0] : [255, 255, 255];
};