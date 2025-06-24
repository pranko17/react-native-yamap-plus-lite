#ifdef RCT_NEW_ARCH_ENABLED

#import "NewArchUtils.h"

@implementation NewArchUtils;

+ (BOOL)pointsEquals:(std::vector<PolylineViewPointsStruct>)points1 points2:(std::vector<PolylineViewPointsStruct>)points2 {
    if (points1.size() != points2.size()) {
        return false;
    }

    for (int i = 0; i < points1.size(); i++) {
        PolylineViewPointsStruct p1 = points1.at(i);
        PolylineViewPointsStruct p2 = points2.at(i);

        if ((p1.lat != p2.lat) || (p1.lon != p2.lon)){
            return false;
        }
    }

    return true;
}

@end

#endif
