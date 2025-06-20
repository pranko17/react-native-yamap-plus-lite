#ifndef ClusteredYamapView_h
#define ClusteredYamapView_h

#import <YamapView.h>

#import <YandexMapsMobile/YMKClusterListener.h>
#import <YandexMapsMobile/YMKClusterTapListener.h>

@class RCTBridge;

@interface ClusteredYamapView: YamapView<YMKClusterListener, YMKClusterTapListener>

- (void)setClusterColor:(UIColor*_Nullable)color;
- (void)setClusteredMarkers:(NSArray<YMKRequestPoint*>*_Nonnull)points;

@end

#endif /* ClusteredYamapView_h */
