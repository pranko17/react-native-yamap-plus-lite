#import <React/RCTViewManager.h>

#import "View/CircleView.h"
#import "Util/RCTConvert+Yamap.mm"

@interface CircleViewManager : RCTViewManager
@end

@implementation CircleViewManager

RCT_EXPORT_MODULE(CircleView)

- (NSArray<NSString*>*)supportedEvents {
    return @[@"onPress"];
}

- (instancetype)init {
    self = [super init];

    return self;
}

- (UIView* _Nullable)view {
    return [[CircleView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY (center, YMKPoint, CircleView) {
   if (json != nil) {
       YMKPoint* point = [RCTConvert YMKPoint:json];
       [view setCircleCenter: point];
   }
}

RCT_CUSTOM_VIEW_PROPERTY (radius, NSNumber, CircleView) {
   [view setRadius: [json floatValue]];
}

RCT_CUSTOM_VIEW_PROPERTY(fillColor, NSNumber, CircleView) {
    [view setFillColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeColor, NSNumber, CircleView) {
    [view setStrokeColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeWidth, NSNumber, CircleView) {
    [view setStrokeWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(zI, NSNumber, CircleView) {
    [view setZIndex: json];
}

RCT_CUSTOM_VIEW_PROPERTY(handled, NSNumber, CircleView) {
    if (json == nil || [json boolValue]) {
        [view setHandled: YES];
    } else {
        [view setHandled: NO];
    }
}

@end
