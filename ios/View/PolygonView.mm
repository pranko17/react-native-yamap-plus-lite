#import "PolygonView.h"

#import "../Util/RCTConvert+Yamap.mm"

@implementation PolygonView {
    NSMutableArray<YMKPoint*>* _points;
    NSArray<NSArray<YMKPoint*>*>* innerRings;
    YMKPolygonMapObject* mapObject;
    YMKPolygon* polygon;
    UIColor* fillColor;
    UIColor* strokeColor;
    NSNumber* strokeWidth;
    NSNumber* zIndex;
    BOOL handled;
}

- (instancetype)init {
    self = [super init];
    fillColor = UIColor.blackColor;
    strokeColor = UIColor.blackColor;
    zIndex = [[NSNumber alloc] initWithInt:1];
    handled = YES;
    strokeWidth = [[NSNumber alloc] initWithInt:1];
    _points = [[NSMutableArray alloc] init];
    innerRings = [[NSMutableArray alloc] init];
    polygon = [YMKPolygon polygonWithOuterRing:[YMKLinearRing linearRingWithPoints:@[]] innerRings:@[]];

    return self;
}

- (void)updatePolygon {
    if (mapObject != nil) {
        [mapObject setGeometry:polygon];
        [mapObject setZIndex:[zIndex floatValue]];
        [mapObject setFillColor:fillColor];
        [mapObject setStrokeColor:strokeColor];
        [mapObject setStrokeWidth:[strokeWidth floatValue]];
    }
}

- (void)setFillColor:(NSNumber*)color {
    fillColor = [RCTConvert UIColor:color];
    [self updatePolygon];
}

- (void)setStrokeColor:(NSNumber*)color {
    strokeColor = [RCTConvert UIColor:color];
    [self updatePolygon];
}

- (void)setStrokeWidth:(NSNumber*)width {
    strokeWidth = width;
    [self updatePolygon];
}

- (void)setZI:(NSNumber*)_zIndex {
    zIndex = _zIndex;
    [self updatePolygon];
}

- (void)updatePolygonGeometry {
    YMKLinearRing* ring = [YMKLinearRing linearRingWithPoints:_points];
    NSMutableArray<YMKLinearRing*>* _innerRings = [[NSMutableArray alloc] init];

    for (int i = 0; i < [innerRings count]; ++i) {
        YMKLinearRing* iRing = [YMKLinearRing linearRingWithPoints:[innerRings objectAtIndex:i]];
        [_innerRings addObject:iRing];
    }
    polygon = [YMKPolygon polygonWithOuterRing:ring innerRings:_innerRings];
}

- (void)setPoints:(NSMutableArray<YMKPoint*>*)points {
    _points = points;
    [self updatePolygonGeometry];
    [self updatePolygon];
}

- (void)setInnerRings:(NSArray<NSArray<YMKPoint*>*>*)_innerRings {
    innerRings = _innerRings;
    [self updatePolygonGeometry];
    [self updatePolygon];
}

- (void)setHandled:(BOOL)_handled {
    handled = _handled;
}

- (void)setMapObject:(YMKPolygonMapObject *)_mapObject {
    mapObject = _mapObject;
    [mapObject addTapListenerWithTapListener:self];
    [self updatePolygon];
}

- (BOOL)onMapObjectTapWithMapObject:(nonnull YMKMapObject*)mapObject point:(nonnull YMKPoint*)point {
    if (self.onPress)
        self.onPress(@{});

    return handled;
}

- (NSMutableArray<YMKPoint*>*)getPoints {
    return _points;
}

- (YMKPolygon*)getPolygon {
    return polygon;
}

- (YMKPolygonMapObject*)getMapObject {
    return mapObject;
}

@end
