#ifndef NewArchUtils_h
#define NewArchUtils_h

#ifdef RCT_NEW_ARCH_ENABLED

#import <react/renderer/components/RNYamapPlusSpec/Props.h>

using namespace facebook::react;

@interface NewArchUtils : NSObject

+ (BOOL)pointsEquals:(std::vector<PolylineViewPointsStruct>)points1 points2:(std::vector<PolylineViewPointsStruct>)points2;

@end

#endif
#endif
