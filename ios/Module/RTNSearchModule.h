#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
@import YandexMapsMobile;

@interface RTNSearchModule : NSObject <RCTBridgeModule>

@property YMKSearchManager *searchManager;
@property YMKBoundingBox *defaultBoundingBox;
@property YMKSearchSession *searchSession;
@property YMKSearchOptions *searchOptions;

@end
