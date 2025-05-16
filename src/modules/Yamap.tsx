import { NativeModules } from 'react-native';

const { yamap: NativeYamapModule } = NativeModules;

export class YamapInstance {
  public static init(apiKey: string): Promise<void> {
    return NativeYamapModule.init(apiKey);
  }

  public static setLocale(locale: string): Promise<void> {
    return NativeYamapModule.setLocale(locale);
  }

  public static getLocale(): Promise<string> {
    return NativeYamapModule.getLocale();
  }

  public static resetLocale(): Promise<void> {
    return NativeYamapModule.resetLocale();
  }
}
