#import <React/RCTViewManager.h>

#import "View/YamapPolylineView.h"
#import "Util/RCTConvert+Yamap.mm"

@interface PolylineViewManager : RCTViewManager
@end

@implementation PolylineViewManager

RCT_EXPORT_MODULE(YamapPolyline)

- (NSArray<NSString*>*)supportedEvents {
    return @[@"onPress"];
}

- (instancetype)init {
    self = [super init];

    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (UIView *_Nullable)view {
    return [[YamapPolylineView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY (points, NSArray<YMKPoint>, YamapPolylineView) {
    if (json != nil) {
        [view setPolylinePoints: [RCTConvert Points:json]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(outlineColor, NSNumber, YamapPolylineView) {
    [view setOutlineColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeColor, NSNumber, YamapPolylineView) {
    [view setStrokeColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeWidth, NSNumber, YamapPolylineView) {
    [view setStrokeWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(dashLength, NSNumber, YamapPolylineView) {
    [view setDashLength: json];
}

RCT_CUSTOM_VIEW_PROPERTY(gapLength, NSNumber, YamapPolylineView) {
    [view setGapLength: json];
}

RCT_CUSTOM_VIEW_PROPERTY(dashOffset, NSNumber, YamapPolylineView) {
    [view setDashOffset: json];
}

RCT_CUSTOM_VIEW_PROPERTY(outlineWidth, NSNumber, YamapPolylineView) {
    [view setOutlineWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(zI, NSNumber, YamapPolylineView) {
    [view setZIndex: json];
}

RCT_CUSTOM_VIEW_PROPERTY(handled, NSNumber, YamapPolylineView) {
    if (json == nil || [json boolValue]) {
        [view setHandled: YES];
    } else {
        [view setHandled: NO];
    }
}

@end
