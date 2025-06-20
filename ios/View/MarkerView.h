#ifndef MarkerView_h
#define MarkerView_h

#import <React/RCTComponent.h>

#import <YandexMapsMobile/YMKPlacemark.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkerView: UIView<YMKMapObjectTapListener, RCTComponent>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

// PROPS
- (void)setZIndex:(NSNumber*)_zIndex;
- (void)setScale:(NSNumber*)_scale;
- (void)setRotated:(NSNumber*)_rotation;
- (void)setSource:(NSString*)_source;
- (void)setPoint:(YMKPoint*)_points;
- (void)setAnchor:(NSValue*)_anchor;
- (void)setVisible:(NSNumber*)_visible;
- (void)setHandled:(BOOL)_visible;

// REF
- (void)animatedMoveTo:(YMKPoint*)point withDuration:(float)duration;
- (void)animatedRotateTo:(float)angle withDuration:(float)duration;
- (YMKPoint*)getPoint;
- (YMKPlacemarkMapObject*)getMapObject;
- (void)setMapObject:(YMKPlacemarkMapObject*)mapObject;
- (void)setClusterMapObject:(YMKPlacemarkMapObject*)mapObject;

@end

NS_ASSUME_NONNULL_END

#endif /* MarkerView_h */
