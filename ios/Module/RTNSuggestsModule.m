#import "RTNSuggestsModule.h"
#import "../Util/RCTConvert+Yamap.m"
@import YandexMapsMobile;

@implementation RTNSuggestsModule

NSString *ERR_SUGGEST_FAILED = @"ERR_SUGGEST_FAILED";

- (instancetype) init {
    YMKPoint *southWestPoint = [YMKPoint pointWithLatitude:-90.0 longitude:-180.0];
    YMKPoint *northEastPoint = [YMKPoint pointWithLatitude:90.0 longitude:180.0];
    _defaultBoundingBox = [YMKBoundingBox boundingBoxWithSouthWest:southWestPoint northEast:northEastPoint];
    _defaultSuggestOptions = [YMKSuggestOptions suggestOptionsWithSuggestTypes:YMKSuggestTypeUnspecified userPosition:nil suggestWords:false strictBounds:false];
    return [super init];
}

- (YMKSearchSuggestSession*) getSuggestClient {
    if (_suggestClient) {
        return _suggestClient;
    }

    if (_searchManager == nil) {
        dispatch_sync(dispatch_get_main_queue(), ^{
            self->_searchManager = [[YMKSearchFactory instance] createSearchManagerWithSearchManagerType:YMKSearchManagerTypeOnline];
        });
    }

    dispatch_sync(dispatch_get_main_queue(), ^{
        self->_suggestClient = [self->_searchManager createSuggestSession];
    });

    return _suggestClient;
}

- (void) suggestHandler:(nonnull NSString*) searchQuery options:(YMKSuggestOptions*) options boundingBox:(YMKBoundingBox*) boundingBox resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject {
    YMKSearchSuggestSession *session = [self getSuggestClient];
    dispatch_async(dispatch_get_main_queue(), ^{
        [session suggestWithText:searchQuery window:boundingBox suggestOptions:options responseHandler:^(YMKSuggestResponse * _Nullable suggest, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SUGGEST_FAILED, @"suggest error:", error);
                return;
            }

            NSMutableArray *suggestsToPass = [NSMutableArray new];

            if (suggest) {
                for (YMKSuggestItem *suggestItem in suggest.items) {
                    NSMutableDictionary *suggestToPass = [NSMutableDictionary new];
                    [suggestToPass setObject:suggestItem.title.text forKey:@"title"];
                    if (suggestItem.subtitle) {
                        [suggestToPass setObject:suggestItem.subtitle.text forKey:@"subtitle"];
                    }
                    [suggestToPass setObject:suggestItem.uri forKey:@"uri"];
                    [suggestsToPass addObject:suggestToPass];
                }
            }

            resolve(suggestsToPass);
        }];
    });
}

- (YMKSuggestType) suggestTypeForNum:(NSNumber*) num {
    switch ([num intValue]) {
        case 0:
            return YMKSuggestTypeUnspecified;
        case 1:
            return YMKSuggestTypeGeo;
        case 2:
            return YMKSuggestTypeBiz;
        case 3:
            return YMKSuggestTypeTransit;
        default:
            return YMKSuggestTypeUnspecified;
    }
}

RCT_EXPORT_METHOD(suggest:(nonnull NSString*) searchQuery resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self suggestHandler:searchQuery options:_defaultSuggestOptions boundingBox:_defaultBoundingBox resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(suggestWithOptions:(nonnull NSString*) searchQuery options:(NSDictionary *) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    YMKSuggestOptions *opt = [[YMKSuggestOptions alloc] init];

    id suggestWords = [options valueForKey:@"suggestWords"];
    if (suggestWords != nil) {
        opt.suggestWords = suggestWords;
    }

    id suggestTypes = [options valueForKey:@"suggestTypes"];
    if (suggestTypes != nil) {
        for (NSNumber *suggestType in suggestTypes) {
            opt.suggestTypes = opt.suggestTypes | [self suggestTypeForNum:suggestType];
        }
    }

    id userPosition = [options valueForKey:@"userPosition"];
    if (userPosition != nil) {
        opt.userPosition = [RCTConvert YMKPoint:userPosition];
    }

    YMKBoundingBox *boundingBox = _defaultBoundingBox;
    id boxDictionary = [options valueForKey:@"boundingBox"];
    if (userPosition != nil) {
        id southWest = [boxDictionary valueForKey:@"southWest"];
        id northEast = [boxDictionary valueForKey:@"northEast"];

        boundingBox = [YMKBoundingBox boundingBoxWithSouthWest:[RCTConvert YMKPoint:southWest] northEast:[RCTConvert YMKPoint:northEast]];
    }

    [self suggestHandler:searchQuery options:opt boundingBox:boundingBox resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(reset: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self->_suggestClient) {
            [self->_suggestClient reset];
            self->_suggestClient = nil;
        }
    });

    resolve(@[]);
}

RCT_EXPORT_MODULE()

@end
