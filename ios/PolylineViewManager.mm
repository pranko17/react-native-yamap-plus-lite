#import <React/RCTViewManager.h>

#import "View/PolylineView.h"
#import "Util/RCTConvert+Yamap.mm"

@interface PolylineViewManager : RCTViewManager
@end

@implementation PolylineViewManager

RCT_EXPORT_MODULE(PolylineView)

- (NSArray<NSString*>*)supportedEvents {
    return @[@"onPress"];
}

- (UIView *)view {
    return [[PolylineView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(points, NSArray<YMKPoint>)
RCT_EXPORT_VIEW_PROPERTY(outlineColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(dashLength, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(gapLength, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(dashOffset, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(outlineWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(zI, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(handled, BOOL)

@end
