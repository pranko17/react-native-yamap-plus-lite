#ifndef RNCYMView_h
#define RNCYMView_h

#import <RNYMView.h>

#import <YandexMapsMobile/YMKClusterListener.h>
#import <YandexMapsMobile/YMKClusterTapListener.h>

@class RCTBridge;

@interface RNCYMView: RNYMView<YMKClusterListener, YMKClusterTapListener>

- (void)setClusterColor:(UIColor*_Nullable)color;
- (void)setClusteredMarkers:(NSArray<YMKRequestPoint*>*_Nonnull)points;

@end

#endif /* RNYMView_h */
