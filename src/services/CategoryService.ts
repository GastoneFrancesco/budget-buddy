export class CategoryService {

    static lightenColor = (color: string): string => {
        // Convert HEX to RGB
        const hexToRgb = (hex: string) =>
          hex.match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));
    
        const rgbColor = hexToRgb(color);
    
        // Calculate lighter shade (increase brightness)
        const lighten = (value: number) => Math.min(255, value + 150);
    
        // Apply lightening to each RGB component
        const lighterRgb = rgbColor.map(lighten);
    
        // Convert RGB back to HEX
        const lighterHex = lighterRgb.map(v => v.toString(16).padStart(2, '0')).join('');
    
        return '#' + lighterHex; // Return the lighter color in HEX format
      }

}