export class ColorConverter {
  private static colorCache: Map<string, any> = new Map<string, any>();

  static convert(color: string): any {
    const fixedColor = ColorConverter.fixColor(color);
    return ColorConverter.colorCache.has(fixedColor) ? ColorConverter.colorCache.get(fixedColor) : ColorConverter.convertAndCache(fixedColor);
  }

  private static fixColor(color: string): string {
    return color.startsWith('#') ? color : `#${color}`;
  }

  private static convertAndCache(cssColor: string): any {
    const cesiumColor: any = Cesium.Color.fromCssColorString(cssColor);
    ColorConverter.colorCache.set(cssColor, cesiumColor);
    return cesiumColor;
  }
}
