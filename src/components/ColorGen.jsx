export function generateColorShades(color, n) {
    const hexColor = color.replace('#', '');
    const rgb = hexToRgb(hexColor);
    const { r, g, b } = rgb;
  
    const shades = [];
    const step = Math.floor(255 / (n - 1));
  
    for (let i = 0; i < n; i++) {
      const shadeR = Math.max(0, r - i * step);
      const shadeG = Math.max(0, g - i * step);
      const shadeB = Math.max(0, b - i * step);
  
      const shadeHex = rgbToHex(shadeR, shadeG, shadeB);
      shades.push(shadeHex);
    }
  
    return shades;
  }
  
  function hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return { r, g, b };
  }
  
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  