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

- (instancetype)init {
    self = [super init];

    return self;
}

- (UIView* _Nullable)view {
    return [[PolygonView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY (points, NSArray<YMKPoint>, PolygonView) {
    if (json != nil) {
        [view setPolygonPoints: [RCTConvert YMKPointArray:json]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY (innerRings, NSArray<NSArray<YMKPoint>>, PolygonView) {
    NSMutableArray* innerRings = [[NSMutableArray alloc] init];

    if (json != nil) {
        for (int i = 0; i < [(NSArray *)json count]; ++i) {
            [innerRings addObject:[RCTConvert YMKPointArray:[json objectAtIndex:i]]];
        }
    }

    [view setInnerRings: innerRings];
}

RCT_CUSTOM_VIEW_PROPERTY(fillColor, NSNumber, PolygonView) {
    [view setFillColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeColor, NSNumber, PolygonView) {
    [view setStrokeColor: [RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(strokeWidth, NSNumber, PolygonView) {
    [view setStrokeWidth: json];
}

RCT_CUSTOM_VIEW_PROPERTY(zI, NSNumber, PolygonView) {
    [view setZIndex: json];
}

RCT_CUSTOM_VIEW_PROPERTY(handled, NSNumber, PolygonView) {
    if (json == nil || [json boolValue]) {
        [view setHandled: YES];
    } else {
        [view setHandled: NO];
    }
}

@end
