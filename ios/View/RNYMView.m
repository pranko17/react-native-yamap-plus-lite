#import <React/RCTComponent.h>
#import <React/UIView+React.h>

#if TARGET_OS_SIMULATOR
#import <mach-o/arch.h>
#endif

#import <MapKit/MapKit.h>
#import "../Converter/RCTConvert+Yamap.m"
@import YandexMapsMobile;

#ifndef MAX
#import <NSObjCRuntime.h>
#endif

#import "YamapPolygonView.h"
#import "YamapPolylineView.h"
#import "YamapMarkerView.h"
#import "YamapCircleView.h"
#import "RNYMView.h"

#define ANDROID_COLOR(c) [UIColor colorWithRed:((c>>16)&0xFF)/255.0 green:((c>>8)&0xFF)/255.0 blue:((c)&0xFF)/255.0  alpha:((c>>24)&0xFF)/255.0]

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

@implementation RNYMView {
    NSMutableArray<UIView*> *_reactSubviews;
    NSMutableArray *routes;
    NSMutableArray *currentRouteInfo;
    NSMutableArray<YMKRequestPoint *> *lastKnownRoutePoints;
    YMKUserLocationView *userLocationView;
    NSMutableDictionary *vehicleColors;
    UIImage *userLocationImage;
    NSNumber *userLocationImageScale;
    NSArray *acceptVehicleTypes;
    YMKUserLocationLayer *userLayer;
    YMKTrafficLayer *trafficLayer;
    UIColor *userLocationAccuracyFillColor;
    UIColor *userLocationAccuracyStrokeColor;
    float userLocationAccuracyStrokeWidth;
    Boolean initializedRegion;
}

- (instancetype)init {
#if TARGET_OS_SIMULATOR
    const NXArchInfo *archInfo = NXGetLocalArchInfo();
    NSString *cpuArch = [NSString stringWithUTF8String:archInfo->description];
    self = [super initWithFrame:CGRectZero vulkanPreferred:[cpuArch hasPrefix:@"ARM64"]];
#else
    self = [super initWithFrame:CGRectZero];
#endif

    _reactSubviews = [[NSMutableArray alloc] init];
    routes = [[NSMutableArray alloc] init];
    currentRouteInfo = [[NSMutableArray alloc] init];
    lastKnownRoutePoints = [[NSMutableArray alloc] init];
    vehicleColors = [[NSMutableDictionary alloc] init];
    [vehicleColors setObject:@"#59ACFF" forKey:@"bus"];
    [vehicleColors setObject:@"#7D60BD" forKey:@"minibus"];
    [vehicleColors setObject:@"#F8634F" forKey:@"railway"];
    [vehicleColors setObject:@"#C86DD7" forKey:@"tramway"];
    [vehicleColors setObject:@"#3023AE" forKey:@"suburban"];
    [vehicleColors setObject:@"#BDCCDC" forKey:@"underground"];
    [vehicleColors setObject:@"#55CfDC" forKey:@"trolleybus"];
    [vehicleColors setObject:@"#2d9da8" forKey:@"walk"];
    userLocationImageScale = [NSNumber numberWithFloat:1.f];
    userLocationAccuracyFillColor = nil;
    userLocationAccuracyStrokeColor = nil;
    userLocationAccuracyStrokeWidth = 0.f;
    [self.mapWindow.map addCameraListenerWithCameraListener:self];
    [self.mapWindow.map addInputListenerWithInputListener:(id<YMKMapInputListener>) self];
    [self.mapWindow.map setMapLoadedListenerWithMapLoadedListener:self];
    initializedRegion = NO;
    return self;
}

- (UIImage*)resolveUIImage:(NSString*)uri {
    UIImage *icon;

    if ([uri rangeOfString:@"http://"].location == NSNotFound && [uri rangeOfString:@"https://"].location == NSNotFound) {
        if ([uri rangeOfString:@"file://"].location != NSNotFound){
            NSString *file = [uri substringFromIndex:8];
            icon = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL fileURLWithPath:file]]];
        } else {
            icon = [UIImage imageNamed:uri];
        }
    } else {
        icon = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:uri]]];
    }

    return icon;
}

- (void)removeAllSections {
    [self.mapWindow.map.mapObjects clear];
}

// REF
- (void)setCenter:(YMKCameraPosition *)position withDuration:(float)duration withAnimation:(int)animation {
    if (duration > 0) {
        YMKAnimationType anim = animation == 0 ? YMKAnimationTypeSmooth : YMKAnimationTypeLinear;
        [self.mapWindow.map moveWithCameraPosition:position animation:[YMKAnimation animationWithType:anim duration: duration] cameraCallback:^(BOOL completed) {}];
    } else {
        [self.mapWindow.map moveWithCameraPosition:position];
    }
}

- (void)setZoom:(float)zoom withDuration:(float)duration withAnimation:(int)animation {
    YMKCameraPosition *prevPosition = self.mapWindow.map.cameraPosition;
    YMKCameraPosition *position = [YMKCameraPosition cameraPositionWithTarget:prevPosition.target zoom:zoom azimuth:prevPosition.azimuth tilt:prevPosition.tilt];
    [self setCenter:position withDuration:duration withAnimation:animation];
}

- (void)setMapType:(NSString *)type {
    if ([type isEqual:@"none"]) {
        self.mapWindow.map.mapType = YMKMapTypeNone;
    } else if ([type isEqual:@"raster"]) {
        self.mapWindow.map.mapType = YMKMapTypeMap;
    } else {
        self.mapWindow.map.mapType = YMKMapTypeVectorMap;
    }
}

- (void)setInitialRegion:(NSDictionary *)initialParams {
    if (initializedRegion) return;
    if ([initialParams valueForKey:@"lat"] == nil || [initialParams valueForKey:@"lon"] == nil) return;

    float initialZoom = 10.f;
    float initialAzimuth = 0.f;
    float initialTilt = 0.f;

    if ([initialParams valueForKey:@"zoom"] != nil) initialZoom = [initialParams[@"zoom"] floatValue];

    if ([initialParams valueForKey:@"azimuth"] != nil) initialTilt = [initialParams[@"azimuth"] floatValue];

    if ([initialParams valueForKey:@"tilt"] != nil) initialTilt = [initialParams[@"tilt"] floatValue];

    YMKPoint *initialRegionCenter = [RCTConvert YMKPoint:@{@"lat" : [initialParams valueForKey:@"lat"], @"lon" : [initialParams valueForKey:@"lon"]}];
    YMKCameraPosition *initialRegionPosition = [YMKCameraPosition cameraPositionWithTarget:initialRegionCenter zoom:initialZoom azimuth:initialAzimuth tilt:initialTilt];
    [self.mapWindow.map moveWithCameraPosition:initialRegionPosition];
    initializedRegion = YES;
}

- (void)setTrafficVisible:(BOOL)traffic {
    YMKMapKit *inst = [YMKMapKit sharedInstance];

    if (trafficLayer == nil) {
        trafficLayer = [inst createTrafficLayerWithMapWindow:self.mapWindow];
    }

    if (traffic) {
        [trafficLayer setTrafficVisibleWithOn:YES];
        [trafficLayer addTrafficListenerWithTrafficListener:self];
    } else {
        [trafficLayer setTrafficVisibleWithOn:NO];
        [trafficLayer removeTrafficListenerWithTrafficListener:self];
    }
}

- (NSDictionary *)cameraPositionToJSON:(YMKCameraPosition *)position reason:(YMKCameraUpdateReason)reason finished:(BOOL)finished {
    return @{
        @"azimuth": [NSNumber numberWithFloat:position.azimuth],
        @"tilt": [NSNumber numberWithFloat:position.tilt],
        @"zoom": [NSNumber numberWithFloat:position.zoom],
        @"point": @{
            @"lat": [NSNumber numberWithDouble:position.target.latitude],
            @"lon": [NSNumber numberWithDouble:position.target.longitude]
        },
        @"reason": reason == 0 ? @"GESTURES" : @"APPLICATION",
        @"finished": @(finished)
    };
}

- (NSDictionary *)worldPointToJSON:(YMKPoint *)point {
    return @{
        @"lat": [NSNumber numberWithDouble:point.latitude],
        @"lon": [NSNumber numberWithDouble:point.longitude]
    };
}

- (NSDictionary *)screenPointToJSON:(YMKScreenPoint *)point {
    return @{
        @"x": [NSNumber numberWithFloat:point.x],
        @"y": [NSNumber numberWithFloat:point.y]
    };
}

- (NSDictionary *)visibleRegionToJSON:(YMKVisibleRegion *)region {
    return @{
        @"bottomLeft": @{
            @"lat": [NSNumber numberWithDouble:region.bottomLeft.latitude],
            @"lon": [NSNumber numberWithDouble:region.bottomLeft.longitude]
        },
        @"bottomRight": @{
            @"lat": [NSNumber numberWithDouble:region.bottomRight.latitude],
            @"lon": [NSNumber numberWithDouble:region.bottomRight.longitude]
        },
        @"topLeft": @{
            @"lat": [NSNumber numberWithDouble:region.topLeft.latitude],
            @"lon": [NSNumber numberWithDouble:region.topLeft.longitude]
        },
        @"topRight": @{
            @"lat": [NSNumber numberWithDouble:region.topRight.latitude],
            @"lon": [NSNumber numberWithDouble:region.topRight.longitude]
        }
    };
}

- (void)emitCameraPositionToJS:(NSString *)_id {
    YMKCameraPosition *position = self.mapWindow.map.cameraPosition;
    NSDictionary *cameraPosition = [self cameraPositionToJSON:position reason:1 finished:YES];
    NSMutableDictionary *response = [NSMutableDictionary dictionaryWithDictionary:cameraPosition];
    [response setValue:_id forKey:@"id"];

    if (self.onCameraPositionReceived) {
        self.onCameraPositionReceived(response);
    }
}

- (void)emitVisibleRegionToJS:(NSString *)_id {
    YMKVisibleRegion *region = self.mapWindow.map.visibleRegion;
    NSDictionary *visibleRegion = [self visibleRegionToJSON:region];
    NSMutableDictionary *response = [NSMutableDictionary dictionaryWithDictionary:visibleRegion];
    [response setValue:_id forKey:@"id"];

    if (self.onVisibleRegionReceived) {
        self.onVisibleRegionReceived(response);
    }
}

- (void)emitWorldToScreenPoint:(NSArray<YMKPoint *> *)worldPoints withId:(NSString *)_id {
    NSMutableArray *screenPoints = [[NSMutableArray alloc] init];

    for (int i = 0; i < [worldPoints count]; ++i) {
        YMKScreenPoint *screenPoint = [self.mapWindow worldToScreenWithWorldPoint:[worldPoints objectAtIndex:i]];
        [screenPoints addObject:[self screenPointToJSON:screenPoint]];
    }

    NSMutableDictionary *response = [[NSMutableDictionary alloc] init];
    [response setValue:_id forKey:@"id"];
    [response setValue:screenPoints forKey:@"screenPoints"];

    if (self.onWorldToScreenPointsReceived) {
        self.onWorldToScreenPointsReceived(response);
    }
}

- (void)emitScreenToWorldPoint:(NSArray<YMKScreenPoint *> *)screenPoints withId:(NSString *)_id {
    NSMutableArray *worldPoints = [[NSMutableArray alloc] init];

    for (int i = 0; i < [screenPoints count]; ++i) {
        YMKPoint *worldPoint = [self.mapWindow screenToWorldWithScreenPoint:[screenPoints objectAtIndex:i]];
        [worldPoints addObject:[self worldPointToJSON:worldPoint]];
    }

    NSMutableDictionary *response = [[NSMutableDictionary alloc] init];
    [response setValue:_id forKey:@"id"];
    [response setValue:worldPoints forKey:@"worldPoints"];

    if (self.onScreenToWorldPointsReceived) {
        self.onScreenToWorldPointsReceived(response);
    }
}

- (void)onCameraPositionChangedWithMap:(nonnull YMKMap*)map
                        cameraPosition:(nonnull YMKCameraPosition*)cameraPosition
                    cameraUpdateReason:(YMKCameraUpdateReason)cameraUpdateReason
                              finished:(BOOL)finished {
    if (self.onCameraPositionChange) {
        self.onCameraPositionChange([self cameraPositionToJSON:cameraPosition reason:cameraUpdateReason finished:finished]);
    }

    if (self.onCameraPositionChangeEnd && finished) {
        self.onCameraPositionChangeEnd([self cameraPositionToJSON:cameraPosition reason:cameraUpdateReason finished:finished]);
    }
}

- (void)setNightMode:(BOOL)nightMode {
    [self.mapWindow.map setNightModeEnabled:nightMode];
}


- (void)setListenUserLocation:(BOOL) listen {
    YMKMapKit *inst = [YMKMapKit sharedInstance];

    if (userLayer == nil) {
        userLayer = [inst createUserLocationLayerWithMapWindow:self.mapWindow];
    }

    if (listen) {
        [userLayer setVisibleWithOn:YES];
        [userLayer setObjectListenerWithObjectListener:self];
    } else {
        [userLayer setVisibleWithOn:NO];
        [userLayer setObjectListenerWithObjectListener:nil];
    }
}

- (void)setFollowUser:(BOOL)follow {
    if (userLayer == nil) {
        [self setListenUserLocation: follow];
    }

    if (follow) {
        [userLayer setAnchorWithAnchorNormal:CGPointMake(0.5 * self.mapWindow.width, 0.5 * self.mapWindow.height) anchorCourse:CGPointMake(0.5 * self.mapWindow.width, 0.83 * self.mapWindow.height )];
        [userLayer setAutoZoomEnabled:YES];
    } else {
        [userLayer setAutoZoomEnabled:NO];
        [userLayer resetAnchor];
    }
}

- (void)fitAllMarkers:(float)duration withAnimation:(int)animation {
    NSMutableArray<YMKPoint *> *lastKnownMarkers = [[NSMutableArray alloc] init];

    for (int i = 0; i < [_reactSubviews count]; ++i) {
        UIView *view = [_reactSubviews objectAtIndex:i];

        if ([view isKindOfClass:[YamapMarkerView class]]) {
            YamapMarkerView *marker = (YamapMarkerView *)view;
            [lastKnownMarkers addObject:[marker getPoint]];
        }
    }

  [self fitMarkers:lastKnownMarkers withDuration:duration withAnimation:animation];
}

- (NSArray<YMKPoint *> *)mapPlacemarksToPoints:(NSArray<YMKPlacemarkMapObject *> *)placemarks {
    NSMutableArray<YMKPoint *> *points = [[NSMutableArray alloc] init];

    for (int i = 0; i < [placemarks count]; ++i) {
        [points addObject:[[placemarks objectAtIndex:i] geometry]];
    }

    return points;
}

- (YMKBoundingBox *)calculateBoundingBox:(NSArray<YMKPoint *> *) points {
    double minLon = [points[0] longitude], maxLon = [points[0] longitude];
    double minLat = [points[0] latitude], maxLat = [points[0] latitude];

    for (int i = 0; i < [points count]; i++) {
        if ([points[i] longitude] > maxLon) maxLon = [points[i] longitude];
        if ([points[i] longitude] < minLon) minLon = [points[i] longitude];
        if ([points[i] latitude] > maxLat) maxLat = [points[i] latitude];
        if ([points[i] latitude] < minLat) minLat = [points[i] latitude];
    }

    YMKPoint *southWest = [YMKPoint pointWithLatitude:minLat longitude:minLon];
    YMKPoint *northEast = [YMKPoint pointWithLatitude:maxLat longitude:maxLon];
    YMKBoundingBox *boundingBox = [YMKBoundingBox boundingBoxWithSouthWest:southWest northEast:northEast];
    return boundingBox;
}

- (void)fitMarkers:(NSArray<YMKPoint *> *) points withDuration:(float)duration withAnimation:(int)animation {
    if ([points count] == 0) {
        return;
    }

    YMKAnimation *anim = [YMKAnimation animationWithType:(animation == 0 ? YMKAnimationTypeSmooth : YMKAnimationTypeLinear) duration:duration];

    if ([points count] == 1) {
        YMKPoint *center = [points objectAtIndex:0];
        [self.mapWindow.map moveWithCameraPosition:[YMKCameraPosition cameraPositionWithTarget:center zoom:15 azimuth:0 tilt:0] animation:anim cameraCallback:^(BOOL completed){}];
        return;
    }
    YMKCameraPosition *cameraPosition = [self.mapWindow.map cameraPositionWithGeometry:[YMKGeometry geometryWithBoundingBox:[self calculateBoundingBox:points]]];
    cameraPosition = [YMKCameraPosition cameraPositionWithTarget:cameraPosition.target zoom:cameraPosition.zoom - 0.8f azimuth:cameraPosition.azimuth tilt:cameraPosition.tilt];
    [self.mapWindow.map moveWithCameraPosition:cameraPosition animation:anim cameraCallback:^(BOOL completed){}];
}

- (void)setLogoPosition:(NSDictionary *)logoPosition {
    NSUInteger horizontalAlignment = YMKLogoHorizontalAlignmentRight;
    NSUInteger verticalAlignment = YMKLogoVerticalAlignmentBottom;

    if ([[logoPosition valueForKey:@"horizontal"] isEqual:@"left"]) {
        horizontalAlignment = YMKLogoHorizontalAlignmentLeft;
    } else if ([[logoPosition valueForKey:@"horizontal"] isEqual:@"center"]) {
        horizontalAlignment = YMKLogoHorizontalAlignmentCenter;
    }

    if ([[logoPosition valueForKey:@"vertical"] isEqual:@"top"]) {
        verticalAlignment = YMKLogoVerticalAlignmentTop;
    }

    [self.mapWindow.map.logo setAlignmentWithAlignment:[YMKLogoAlignment alignmentWithHorizontalAlignment:horizontalAlignment verticalAlignment:verticalAlignment]];
}

- (void)setLogoPadding:(NSDictionary *)logoPadding {
    NSUInteger horizontalPadding = [logoPadding valueForKey:@"horizontal"] != nil ? [RCTConvert NSUInteger:logoPadding[@"horizontal"]] : 0;
    NSUInteger verticalPadding = [logoPadding valueForKey:@"vertical"] != nil ? [RCTConvert NSUInteger:logoPadding[@"vertical"]] : 0;

    YMKLogoPadding *padding = [YMKLogoPadding paddingWithHorizontalPadding:horizontalPadding verticalPadding:verticalPadding];
    [self.mapWindow.map.logo setPaddingWithPadding:padding];
}

// PROPS
- (void)setUserLocationIcon:(NSString *)iconSource {
    userLocationImage = [self resolveUIImage:iconSource];
    [self updateUserIcon];
}

- (void)setUserLocationIconScale:(NSNumber *)iconScale {
    userLocationImageScale = iconScale;
    [self updateUserIcon];
}

- (void)setUserLocationAccuracyFillColor:(UIColor *)color {
    userLocationAccuracyFillColor = color;
    [self updateUserIcon];
}

- (void)setUserLocationAccuracyStrokeColor:(UIColor *)color {
    userLocationAccuracyStrokeColor = color;
    [self updateUserIcon];
}

- (void)setUserLocationAccuracyStrokeWidth:(float)width {
    userLocationAccuracyStrokeWidth = width;
    [self updateUserIcon];
}

- (void)updateUserIcon {
    if (userLocationView != nil) {
        if (userLocationImage) {
            YMKIconStyle *userIconStyle = [[YMKIconStyle alloc] init];
            [userIconStyle setScale:userLocationImageScale];

            [userLocationView.pin setIconWithImage:userLocationImage style:userIconStyle];
            [userLocationView.arrow setIconWithImage:userLocationImage style:userIconStyle];
        }

        YMKCircleMapObject* circle = userLocationView.accuracyCircle;

        if (userLocationAccuracyFillColor) {
            [circle setFillColor:userLocationAccuracyFillColor];
        }

        if (userLocationAccuracyStrokeColor) {
            [circle setStrokeColor:userLocationAccuracyStrokeColor];
        }

        [circle setStrokeWidth:userLocationAccuracyStrokeWidth];
    }
}

- (void)onObjectAddedWithView:(nonnull YMKUserLocationView *)view {
    userLocationView = view;
    [self updateUserIcon];
}

- (void)onObjectRemovedWithView:(nonnull YMKUserLocationView *)view {
}

- (void)onObjectUpdatedWithView:(nonnull YMKUserLocationView *)view event:(nonnull YMKObjectEvent *)event {
    userLocationView = view;
    [self updateUserIcon];
}

- (void)onMapTapWithMap:(nonnull YMKMap *)map
                  point:(nonnull YMKPoint *)point {
    if (self.onMapPress) {
        NSDictionary *data = @{
            @"lat": [NSNumber numberWithDouble:point.latitude],
            @"lon": [NSNumber numberWithDouble:point.longitude]
        };
        self.onMapPress(data);
    }
}

- (void)onMapLongTapWithMap:(nonnull YMKMap *)map
                      point:(nonnull YMKPoint *)point {
    if (self.onMapLongPress) {
        NSDictionary *data = @{
            @"lat": [NSNumber numberWithDouble:point.latitude],
            @"lon": [NSNumber numberWithDouble:point.longitude]
        };
        self.onMapLongPress(data);
    }
}

// UTILS
+ (UIColor*)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1];
    [scanner scanHexInt:&rgbValue];

    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

+ (NSString *)hexStringFromColor:(UIColor *)color {
    const CGFloat *components = CGColorGetComponents(color.CGColor);
    CGFloat r = components[0];
    CGFloat g = components[1];
    CGFloat b = components[2];

    return [NSString stringWithFormat:@"#%02lX%02lX%02lX", lroundf(r * 255), lroundf(g * 255), lroundf(b * 255)];
}

// CHILDREN
- (void)addSubview:(UIView *)view {
    [super addSubview:view];
}

- (void)insertReactSubview:(UIView<RCTComponent> *)subview atIndex:(NSInteger)atIndex {
    if ([subview isKindOfClass:[YamapPolygonView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapPolygonView *polygon = (YamapPolygonView *) subview;
        YMKPolygonMapObject *obj = [objects addPolygonWithPolygon:[polygon getPolygon]];
        [polygon setMapObject:obj];
    } else if ([subview isKindOfClass:[YamapPolylineView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapPolylineView *polyline = (YamapPolylineView*) subview;
        YMKPolylineMapObject *obj = [objects addPolylineWithPolyline:[polyline getPolyline]];
        [polyline setMapObject:obj];
    } else if ([subview isKindOfClass:[YamapMarkerView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapMarkerView *marker = (YamapMarkerView *) subview;
        YMKPlacemarkMapObject *obj = [objects addPlacemark];
        [obj setIconWithImage:[[UIImage alloc] init]];
        [obj setGeometry:[marker getPoint]];
        [marker setMapObject:obj];
    } else if ([subview isKindOfClass:[YamapCircleView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapCircleView *circle = (YamapCircleView*) subview;
        YMKCircleMapObject *obj = [objects addCircleWithCircle:[circle getCircle]];
        [circle setMapObject:obj];
    } else {
        NSArray<id<RCTComponent>> *childSubviews = [subview reactSubviews];
        for (int i = 0; i < childSubviews.count; i++) {
            [self insertReactSubview:(UIView *)childSubviews[i] atIndex:atIndex];
        }
    }

    [_reactSubviews insertObject:subview atIndex:atIndex];
    [super insertReactSubview:subview atIndex:atIndex];
}

- (void)insertMarkerReactSubview:(UIView<RCTComponent> *) subview atIndex:(NSInteger) atIndex {
    [_reactSubviews insertObject:subview atIndex:atIndex];
    [super insertReactSubview:subview atIndex:atIndex];
}

- (void)removeMarkerReactSubview:(UIView<RCTComponent> *) subview {
    [_reactSubviews removeObject:subview];
    [super removeReactSubview: subview];
}

- (void)removeReactSubview:(UIView<RCTComponent> *)subview {
    if ([subview isKindOfClass:[YamapPolygonView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapPolygonView *polygon = (YamapPolygonView *) subview;
        [objects removeWithMapObject:[polygon getMapObject]];
    } else if ([subview isKindOfClass:[YamapPolylineView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapPolylineView *polyline = (YamapPolylineView *) subview;
        [objects removeWithMapObject:[polyline getMapObject]];
    } else if ([subview isKindOfClass:[YamapMarkerView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapMarkerView *marker = (YamapMarkerView *) subview;
        [objects removeWithMapObject:[marker getMapObject]];
    } else if ([subview isKindOfClass:[YamapCircleView class]]) {
        YMKMapObjectCollection *objects = self.mapWindow.map.mapObjects;
        YamapCircleView *circle = (YamapCircleView *) subview;
        [objects removeWithMapObject:[circle getMapObject]];
    } else {
        NSArray<id<RCTComponent>> *childSubviews = [subview reactSubviews];
        for (int i = 0; i < childSubviews.count; i++) {
            [self removeReactSubview:(UIView *)childSubviews[i]];
        }
    }

    [_reactSubviews removeObject:subview];
    [super removeReactSubview: subview];
}

- (void)onMapLoadedWithStatistics:(YMKMapLoadStatistics*)statistics {
    if (self.onMapLoaded) {
        NSDictionary *data = @{
            @"renderObjectCount": @(statistics.renderObjectCount),
            @"curZoomModelsLoaded": @(statistics.curZoomModelsLoaded),
            @"curZoomPlacemarksLoaded": @(statistics.curZoomPlacemarksLoaded),
            @"curZoomLabelsLoaded": @(statistics.curZoomLabelsLoaded),
            @"curZoomGeometryLoaded": @(statistics.curZoomGeometryLoaded),
            @"tileMemoryUsage": @(statistics.tileMemoryUsage),
            @"delayedGeometryLoaded": @(statistics.delayedGeometryLoaded),
            @"fullyAppeared": @(statistics.fullyAppeared),
            @"fullyLoaded": @(statistics.fullyLoaded),
        };
        self.onMapLoaded(data);
    }
}

- (void)setInteractive:(BOOL)interactive {
    [self setNoninteractive:!interactive];
}


@synthesize reactTag;

@synthesize rootTag;

- (void)onTrafficLoading {
}

- (void)onTrafficChangedWithTrafficLevel:(nullable YMKTrafficLevel *)trafficLevel {
}

- (void)onTrafficExpired {
}

@end
