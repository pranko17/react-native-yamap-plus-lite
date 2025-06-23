#ifndef PolylineView_h
#define PolylineView_h

#import <React/RCTComponent.h>

#import <YandexMapsMobile/YMKPolyline.h>

NS_ASSUME_NONNULL_BEGIN

@interface PolylineView: UIView<YMKMapObjectTapListener>

@property (nonatomic, copy) RCTBubblingEventBlock onPress;

- (YMKPolyline*)getPolyline;
- (YMKPolylineMapObject*)getMapObject;
- (void)setMapObject:(YMKPolylineMapObject*)mapObject;

@end

NS_ASSUME_NONNULL_END

#endif /* PolylineView_h */
