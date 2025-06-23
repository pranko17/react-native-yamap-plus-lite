#ifndef PolygonView_h
#define PolygonView_h

#import <React/RCTComponent.h>

#import <YandexMapsMobile/YMKPolygon.h>

NS_ASSUME_NONNULL_BEGIN

@interface PolygonView: UIView<YMKMapObjectTapListener>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

- (YMKPolygon*)getPolygon;
- (YMKPolygonMapObject*)getMapObject;
- (void)setMapObject:(YMKPolygonMapObject*)mapObject;

@end

NS_ASSUME_NONNULL_END

#endif /* PolygonView_h */
