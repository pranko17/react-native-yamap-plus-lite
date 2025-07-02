#ifndef RNCYMView_h
#define RNCYMView_h
#import <React/RCTComponent.h>

#import <MapKit/MapKit.h>
#import <RNYMView.h>
@import YandexMapsMobile;

@class RCTBridge;

@interface RNCYMView: RNYMView<YMKClusterListener, YMKClusterTapListener>

- (void)setClusterColor:(UIColor*_Nullable)color;
- (void)setClusteredMarkers:(NSArray<YMKRequestPoint*>*_Nonnull)points;
- (void)setClusterIcon:(NSString *_Nullable)iconSource;
- (void)setClusterSize:(NSDictionary *_Nullable)sizes;
- (void)setClusterTextColor:(UIColor*_Nullable)color;
- (void)setClusterTextSize:(double)size;
- (void)setClusterTextXOffset:(double)size;
- (void)setClusterTextYOffset:(double)size;

@end

#endif /* RNYMView_h */
