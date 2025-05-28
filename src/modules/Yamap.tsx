import NativeYamapModule from '../spec/NativeYamapModule';

export class YamapInstance {
  public static init(apiKey: string) {
    return NativeYamapModule.init(apiKey);
  }
  public static setLocale(locale: string) {
    return NativeYamapModule.setLocale(locale);
  }
  public static getLocale() {
    return NativeYamapModule.getLocale();
  }
  public static resetLocale() {
    return NativeYamapModule.resetLocale();
  }
}
