#ifndef CircleView_h
#define CircleView_h

#import <React/RCTComponent.h>

#import <YandexMapsMobile/YMKCircle.h>
#import <YandexMapsMobile/YMKPolygon.h>

NS_ASSUME_NONNULL_BEGIN

@interface CircleView: UIView<YMKMapObjectTapListener>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

// PROPS
- (void)setFillColor:(UIColor*)color;
- (void)setStrokeColor:(UIColor*)color;
- (void)setStrokeWidth:(NSNumber*)width;
- (void)setZIndex:(NSNumber*)_zIndex;
- (void)setCircleCenter:(YMKPoint*)center;
- (void)setRadius:(float)radius;
- (YMKCircle*)getCircle;
- (YMKPolygonMapObject*)getMapObject;
- (void)setMapObject:(YMKCircleMapObject*)mapObject;
- (void)setHandled:(BOOL)_handled;

@end

NS_ASSUME_NONNULL_END

#endif /* CircleView_h */
