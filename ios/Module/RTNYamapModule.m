#import "RTNYamapModule.h"
@import YandexMapsMobile;

@implementation RTNYamapModule

RCT_EXPORT_METHOD(init: (NSString *) apiKey
          resolver:(RCTPromiseResolveBlock)resolve
          rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_sync(dispatch_get_main_queue(), ^{
        @try {
            [YMKMapKit setApiKey: apiKey];
            [[YMKMapKit sharedInstance] onStart];
            resolve(nil);
        } @catch (NSException *exception) {
            NSError *error = nil;
            if (exception.userInfo.count > 0) {
                error = [NSError errorWithDomain:NSCocoaErrorDomain code:0 userInfo:exception.userInfo];
            }
            reject(exception.name, exception.reason ?: @"Error initiating YMKMapKit", error);
        }
    });
}

RCT_EXPORT_METHOD(setLocale: (NSString *) locale
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [YRTI18nManagerFactory setLocaleWithLocale:locale];
        resolve(nil);
    });
}

RCT_EXPORT_METHOD(resetLocale:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_sync(dispatch_get_main_queue(), ^{
        [YRTI18nManagerFactory setLocaleWithLocale:nil];
        resolve(nil);
    });
}

RCT_EXPORT_METHOD(getLocale:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_sync(dispatch_get_main_queue(), ^{
        NSString *locale = [YRTI18nManagerFactory getLocale];
        resolve(locale);
    });
}

RCT_EXPORT_MODULE()

@end
