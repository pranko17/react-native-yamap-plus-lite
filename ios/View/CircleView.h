#ifndef CircleView_h
#define CircleView_h

#import <React/RCTComponent.h>

#import <YandexMapsMobile/YMKCircle.h>
#import <YandexMapsMobile/YMKPolygon.h>

NS_ASSUME_NONNULL_BEGIN

@interface CircleView: UIView<YMKMapObjectTapListener>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

// PROPS
- (void)setCircleCenter:(YMKPoint*)center;
- (YMKCircle*)getCircle;
- (YMKPolygonMapObject*)getMapObject;
- (void)setMapObject:(YMKCircleMapObject*)mapObject;

@end

NS_ASSUME_NONNULL_END

#endif /* CircleView_h */
