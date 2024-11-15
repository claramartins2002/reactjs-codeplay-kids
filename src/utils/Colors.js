import { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, amber, orange, deepOrange, brown, blueGrey } from '@mui/material/colors';

// Lista de paletas de cores do Material-UI
const colorPalettes = [
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, amber, orange, deepOrange, brown, blueGrey
];

export default class ColorUtils {
  /**
   * Gera uma cor aleatória com intensidade específica
   * @param {number} shade - Intensidade desejada (por exemplo, 500, 700)
   * @returns {string} - Código hexadecimal da cor
   */
  static getRandomColor(shade = 500) {
    // Seleciona uma paleta de cores aleatória
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    // Retorna a cor com a intensidade específica
    return randomPalette[shade];
  }

  static getColor(colorName, shade = 500) {
    const selectedPalette = colorPalettes[colorName];
    return selectedPalette[shade]
  }
}
