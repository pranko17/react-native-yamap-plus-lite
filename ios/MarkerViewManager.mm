#import <React/RCTUIManager.h>

#import "View/MarkerView.h"
#import "Util/RCTConvert+Yamap.mm"

@interface MarkerViewManager : RCTViewManager
@end

@implementation MarkerViewManager

RCT_EXPORT_MODULE(MarkerView)

- (NSArray<NSString*>*)supportedEvents {
    return @[@"onPress"];
}

- (instancetype)init {
    self = [super init];

    return self;
}

- (UIView* _Nullable)view {
    return [[MarkerView alloc] init];
}

// PROPS
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY (point, YMKPoint, MarkerView) {
    if (json != nil) {
        [view setPoint: [RCTConvert YMKPoint:json]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(scale, NSNumber, MarkerView) {
    [view setScale: json];
}

RCT_CUSTOM_VIEW_PROPERTY(rotated, NSNumber, MarkerView) {
    [view setRotated: json];
}

RCT_CUSTOM_VIEW_PROPERTY(visible, NSNumber, MarkerView) {
    [view setVisible: json];
}

RCT_CUSTOM_VIEW_PROPERTY(handled, BOOL, MarkerView) {
    if (json == nil || [json boolValue]) {
        [view setHandled: YES];
    } else {
        [view setHandled: NO];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(anchor, NSDictionary, MarkerView) {
    CGPoint point;

    if (json) {
        CGFloat x = [[json valueForKey:@"x"] doubleValue];
        CGFloat y = [[json valueForKey:@"y"] doubleValue];
        point = CGPointMake(x, y);
    } else {
        point = CGPointMake(0.5, 0.5);
    }

    [view setAnchor: [NSValue valueWithCGPoint:point]];
}

RCT_CUSTOM_VIEW_PROPERTY(zI, NSNumber, MarkerView) {
    [view setZIndex: json];
}

RCT_CUSTOM_VIEW_PROPERTY(source, NSString, MarkerView) {
    [view setSource: json];
}

// REF
RCT_EXPORT_METHOD(animatedMoveTo:(nonnull NSNumber*)reactTag argsArr:(NSArray*)argsArr) {
    @try  {
        [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
            MarkerView* view = (MarkerView*)viewRegistry[reactTag];

            if (!view || ![view isKindOfClass:[MarkerView class]]) {
                RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
                return;
            }

            NSDictionary* args = argsArr.firstObject;
            YMKPoint* point = [RCTConvert YMKPoint:args[@"coords"]];
            [view animatedMoveTo:point withDuration:[args[@"duration"] floatValue]];
        }];
    } @catch (NSException *exception) {
        NSLog(@"Reason: %@ ",exception.reason);
    }
}

RCT_EXPORT_METHOD(animatedRotateTo:(nonnull NSNumber*)reactTag argsArr:(NSArray*)argsArr) {
    @try  {
        [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber*, UIView*> *viewRegistry) {
            MarkerView* view = (MarkerView*)viewRegistry[reactTag];

            if (!view || ![view isKindOfClass:[MarkerView class]]) {
                RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
                return;
            }

            NSDictionary* args = argsArr.firstObject;
            [view animatedRotateTo:[args[@"angle"] floatValue] withDuration:[args[@"duration"] floatValue]];
        }];
    } @catch (NSException *exception) {
        NSLog(@"Reason: %@ ",exception.reason);
    }
}

@end
