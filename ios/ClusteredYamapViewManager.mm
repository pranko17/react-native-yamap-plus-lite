#import <React/RCTUIManager.h>

#import "View/ClusteredYamapView.h"
#import "Util/RCTConvert+Yamap.mm"

#import <YandexMapsMobile/YMKMap.h>

@interface ClusteredYamapViewManager : RCTViewManager
@end

@implementation ClusteredYamapViewManager

RCT_EXPORT_MODULE(ClusteredYamapView)

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"onRouteFound",
        @"onCameraPositionReceived",
        @"onVisibleRegionReceived",
        @"onCameraPositionChange",
        @"onMapPress",
        @"onMapLongPress",
        @"onCameraPositionChangeEnd",
        @"onMapLoaded",
        @"onWorldToScreenPointsReceived",
        @"onScreenToWorldPointsReceived"
    ];
}

- (instancetype)init {
    self = [super init];
    return self;
}

- (UIView *_Nullable)view {
    ClusteredYamapView *map = [[ClusteredYamapView alloc] init];
    return map;
}

- (void)setCenterForMap:(ClusteredYamapView*)map center:(NSDictionary*)_center zoom:(float)zoom azimuth:(float)azimuth tilt:(float)tilt duration:(float)duration animation:(int)animation {
    YMKPoint *center = [RCTConvert YMKPoint:_center];
    YMKCameraPosition *pos = [YMKCameraPosition cameraPositionWithTarget:center zoom:zoom azimuth:azimuth tilt:tilt];
    [map setCenter:pos withDuration:duration withAnimation:animation];
}

// props
RCT_EXPORT_VIEW_PROPERTY(onRouteFound, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraPositionReceived, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVisibleRegionReceived, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraPositionChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapLongPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraPositionChangeEnd, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onWorldToScreenPointsReceived, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onScreenToWorldPointsReceived, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(initialRegion, NSDictionary, RNYMView) {
    if (json && view) {
        [view setInitialRegion:json];
    }
}
RCT_CUSTOM_VIEW_PROPERTY(userLocationAccuracyFillColor, NSNumber, ClusteredYamapView) {
    [view setUserLocationAccuracyFillColor:[RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(clusterColor, NSNumber, ClusteredYamapView) {
    [view setClusterColor:[RCTConvert UIColor:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(clusteredMarkers, NSArray<YMKRequestPoint*>*_Nonnull, ClusteredYamapView) {
    [view setClusteredMarkers:[RCTConvert NSArray:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(userLocationAccuracyStrokeColor, NSNumber, ClusteredYamapView) {
    [view setUserLocationAccuracyStrokeColor:[RCTConvert UIColor:json]];
}


RCT_CUSTOM_VIEW_PROPERTY(userLocationAccuracyStrokeWidth, NSNumber, ClusteredYamapView) {
    [view setUserLocationAccuracyStrokeWidth:[json floatValue]];
}

RCT_CUSTOM_VIEW_PROPERTY(userLocationIcon, NSString, ClusteredYamapView) {
    if (json && view) {
        [view setUserLocationIcon:json];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(userLocationIconScale, NSNumber, ClusteredYamapView) {
    if (json && view) {
        [view setUserLocationIconScale:json];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(showUserPosition, BOOL, ClusteredYamapView) {
    if (view) {
        [view setListenUserLocation: json ? [json boolValue] : NO];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(followUser, BOOL, ClusteredYamapView) {
    [view setFollowUser: json ? [json boolValue] : NO];
}

RCT_CUSTOM_VIEW_PROPERTY(nightMode, BOOL, ClusteredYamapView) {
    if (view) {
        [view setNightMode: json ? [json boolValue]: NO];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(mapStyle, NSString, ClusteredYamapView) {
    if (json && view) {
        [view.mapWindow.map setMapStyleWithStyle:json];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(zoomGesturesEnabled, BOOL, ClusteredYamapView) {
    if (view) {
        view.mapWindow.map.zoomGesturesEnabled = json ? [json boolValue] : YES;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(scrollGesturesEnabled, BOOL, ClusteredYamapView) {
    if (view) {
        view.mapWindow.map.scrollGesturesEnabled = json ? [json boolValue] : YES;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(tiltGesturesEnabled, BOOL, ClusteredYamapView) {
    if (view) {
        view.mapWindow.map.tiltGesturesEnabled = json ? [json boolValue] : YES;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(rotateGesturesEnabled, BOOL, ClusteredYamapView) {
    if (view) {
        view.mapWindow.map.rotateGesturesEnabled = json ? [json boolValue] : YES;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(fastTapEnabled, BOOL, ClusteredYamapView) {
    if (view) {
        view.mapWindow.map.fastTapEnabled = json ? [json boolValue] : YES;
    }
}

RCT_CUSTOM_VIEW_PROPERTY(mapType, NSString, ClusteredYamapView) {
    if (view) {
        [view setMapType:json];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(interactive, BOOL, ClusteredYamapView) {
    if (json && view) {
        [view setInteractive:[json boolValue]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(logoPosition, BOOL, ClusteredYamapView) {
    if (json && view) {
        [view setLogoPosition:json];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(logoPadding, BOOL, ClusteredYamapView) {
    if (json && view) {
        [view setLogoPadding:json];
    }
}

// ref
RCT_EXPORT_METHOD(fitAllMarkers:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view fitAllMarkers];
    }];
}

RCT_EXPORT_METHOD(fitMarkers:(nonnull NSNumber *)reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView*> *viewRegistry) {
        RNYMView *view = (RNYMView *)viewRegistry[reactTag];

        if (!view || ![view isKindOfClass:[RNYMView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        NSArray<YMKPoint *> *points = [RCTConvert Points:args[@"points"]];
        [view fitMarkers: points];
    }];
}

RCT_EXPORT_METHOD(findRoutes:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        NSArray<YMKPoint*>* points = [RCTConvert Points:args[@"points"]];
        NSMutableArray<YMKRequestPoint*>* requestPoints = [[NSMutableArray alloc] init];
        for (int i = 0; i < [points count]; ++i) {
            YMKRequestPoint * requestPoint = [YMKRequestPoint requestPointWithPoint:[points objectAtIndex:i] type:YMKRequestPointTypeWaypoint pointContext:nil drivingArrivalPointId:nil indoorLevelId:nil];
            [requestPoints addObject:requestPoint];
        }
        NSArray<NSString*>* vehicles = [RCTConvert Vehicles:args[@"vehicles"]];
        [view findRoutes: requestPoints vehicles: vehicles withId:args[@"id"]];
    }];
}

RCT_EXPORT_METHOD(setCenter:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        [self setCenterForMap: view center:args[@"center"] zoom:[args[@"zoom"] floatValue] azimuth:[args[@"azimuth"] floatValue] tilt: [args[@"tilt"] floatValue] duration: [args[@"duration"] floatValue] animation: [args[@"animation"] intValue]];
    }];
}

RCT_EXPORT_METHOD(setZoom:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        [view setZoom:[args[@"zoom"] floatValue] withDuration:[args[@"duration"] floatValue] withAnimation:[args[@"animation"] intValue]];
    }];
}

RCT_EXPORT_METHOD(getCameraPosition:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        [view emitCameraPositionToJS:args[@"id"]];
    }];
}

RCT_EXPORT_METHOD(getVisibleRegion:(nonnull NSNumber*) reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        ClusteredYamapView *view = (ClusteredYamapView*) viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[ClusteredYamapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        [view emitVisibleRegionToJS:args[@"id"]];
    }];
}

RCT_EXPORT_METHOD(getScreenPoints:(nonnull NSNumber *)reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        RNYMView *view = (RNYMView *)viewRegistry[reactTag];

        if (!view || ![view isKindOfClass:[RNYMView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        NSArray<YMKPoint *> *mapPoints = [RCTConvert Points:args[@"points"]];
        [view emitWorldToScreenPoint:mapPoints withId:args[@"id"]];
    }];
}

RCT_EXPORT_METHOD(getWorldPoints:(nonnull NSNumber *)reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        RNYMView *view = (RNYMView *)viewRegistry[reactTag];

        if (!view || ![view isKindOfClass:[RNYMView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        NSArray<YMKScreenPoint *> *screenPoints = [RCTConvert ScreenPoints:args[@"points"]];
        [view emitScreenToWorldPoint:screenPoints withId:args[@"id"]];
    }];
}

RCT_EXPORT_METHOD(setTrafficVisible:(nonnull NSNumber *)reactTag argsArr:(NSArray*)argsArr) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        RNYMView *view = (RNYMView *)viewRegistry[reactTag];

        if (!view || ![view isKindOfClass:[RNYMView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }

        NSDictionary* args = argsArr.firstObject;
        [view setTrafficVisible:args[@"isVisible"]];
    }];
}

@end
