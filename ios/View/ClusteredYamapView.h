#ifndef ClusteredYamapView_h
#define ClusteredYamapView_h

#import <RNYMView.h>

#import <YandexMapsMobile/YMKClusterListener.h>
#import <YandexMapsMobile/YMKClusterTapListener.h>

@class RCTBridge;

@interface ClusteredYamapView: RNYMView<YMKClusterListener, YMKClusterTapListener>

- (void)setClusterColor:(UIColor*_Nullable)color;
- (void)setClusteredMarkers:(NSArray<YMKRequestPoint*>*_Nonnull)points;

@end

#endif /* RNYMView_h */
