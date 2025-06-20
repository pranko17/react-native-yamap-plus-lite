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

- (instancetype)init {
    self = [super init];

    return self;
}

- (UIView *_Nullable)view {
    return [[PolylineView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY (points, NSArray<YMKPoint>, PolylineView) {
    if (json != nil) {
        [view setPolylinePoints: [RCTConvert Points:json]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(outlineColor, NSNumber, PolylineView) {
    [view setOutlineColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeColor, NSNumber, PolylineView) {
    [view setStrokeColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeWidth, NSNumber, PolylineView) {
    [view setStrokeWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(dashLength, NSNumber, PolylineView) {
    [view setDashLength: json];
}

RCT_CUSTOM_VIEW_PROPERTY(gapLength, NSNumber, PolylineView) {
    [view setGapLength: json];
}

RCT_CUSTOM_VIEW_PROPERTY(dashOffset, NSNumber, PolylineView) {
    [view setDashOffset: json];
}

RCT_CUSTOM_VIEW_PROPERTY(outlineWidth, NSNumber, PolylineView) {
    [view setOutlineWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(zI, NSNumber, PolylineView) {
    [view setZIndex: json];
}

RCT_CUSTOM_VIEW_PROPERTY(handled, NSNumber, PolylineView) {
    if (json == nil || [json boolValue]) {
        [view setHandled: YES];
    } else {
        [view setHandled: NO];
    }
}

@end
