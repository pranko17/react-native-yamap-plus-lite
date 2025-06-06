#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
@import YandexMapsMobile;

@interface RTNSuggestsModule : NSObject <RCTBridgeModule>

@property YMKSearchManager *searchManager;;
@property YMKSearchSuggestSession *suggestClient;
@property YMKBoundingBox *defaultBoundingBox;
@property YMKSuggestOptions *defaultSuggestOptions;

@end
