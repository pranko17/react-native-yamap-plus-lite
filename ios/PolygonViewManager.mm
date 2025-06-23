#import <React/RCTViewManager.h>

#import "View/PolygonView.h"
#import "Util/RCTConvert+Yamap.mm"

@interface PolygonViewManager : RCTViewManager
@end

@implementation PolygonViewManager

RCT_EXPORT_MODULE(PolygonView)

- (NSArray<NSString*>*)supportedEvents {
    return @[@"onPress"];
}

- (UIView* _Nullable)view {
    return [[PolygonView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(points, NSArray<YMKPoint>)
RCT_EXPORT_VIEW_PROPERTY(innerRings, NSArray<NSArray<YMKPoint>>)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(zI, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(handled, BOOL)

@end
