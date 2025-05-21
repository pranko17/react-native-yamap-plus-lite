import { NativeModules } from 'react-native';

const { yamap: YamapNativeModule } = NativeModules;

export class YamapInstance {
  public static init(apiKey: string): Promise<void> {
    return YamapNativeModule.init(apiKey);
  }

  public static setLocale(locale: string): Promise<void> {
    return YamapNativeModule.setLocale(locale);
  }

  public static getLocale(): Promise<string> {
    return YamapNativeModule.getLocale();
  }

  public static resetLocale(): Promise<void> {
    return YamapNativeModule.resetLocale();
  }
}
