#import "RTNSuggestsModule.h"
#import "../Util/RCTConvert+Yamap.mm"

#import <YandexMapsMobile/YMKSearch.h>
#import <YandexMapsMobile/YMKSearchSuggestSession.h>
#import <YandexMapsMobile/YMKSuggestResponse.h>

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

- (void) suggestImpl:(nonnull NSString*) searchQuery options:(YMKSuggestOptions*) options boundingBox:(YMKBoundingBox*) boundingBox resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject {
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

- (YMKSuggestType) suggestTypeForString:(NSString*) str {
    if ([str isEqual:@"GEO"]) {
        return YMKSuggestTypeGeo;
    }

    if ([str isEqual:@"BIZ"]) {
        return YMKSuggestTypeBiz;
    }

    if ([str isEqual:@"TRANSIT"]) {
        return YMKSuggestTypeTransit;
    }

    return YMKSuggestTypeUnspecified;
}

- (void)resetImpl:(RCTPromiseResolveBlock) resolve  {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self->_suggestClient) {
            [self->_suggestClient reset];
            self->_suggestClient = nil;
        }
    });

    resolve(@[]);
}

#ifdef RCT_NEW_ARCH_ENABLED

// New architecture

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeSuggestsModuleSpecJSI>(params);
}

- (void)suggest:(nonnull NSString *)query resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self suggestImpl:query options:_defaultSuggestOptions boundingBox:_defaultBoundingBox resolver:resolve rejecter:reject];
}

- (void)suggestWithOptions:(nonnull NSString *)query options:(JS::NativeSuggestsModule::SuggestOptions &)options resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    YMKSuggestOptions *opt = [[YMKSuggestOptions alloc] init];

    std::optional<bool> suggestWords = options.suggestWords();
    if (suggestWords) {
        opt.suggestWords = *suggestWords;
    }

    std::optional<facebook::react::LazyVector<NSString *>> suggestTypes = options.suggestTypes();

    if (suggestTypes) {
        FB::LazyVector<NSString *, id> values = suggestTypes.value();
        for (int i=0; i<values.size(); i++) {
            opt.suggestTypes = opt.suggestTypes | [self suggestTypeForString:values.at(i)];
        }
    }

    std::optional<JS::NativeSuggestsModule::Point> userPosition = options.userPosition();
    if (userPosition) {
        JS::NativeSuggestsModule::Point value = userPosition.value();
        opt.userPosition = [YMKPoint pointWithLatitude:value.lat() longitude:value.lon()];
    }

    YMKBoundingBox *boundingBox = _defaultBoundingBox;
    std::optional<JS::NativeSuggestsModule::BoundingBox> boundingBoxJS = options.boundingBox();
    if (boundingBoxJS) {
        YMKPoint *southWest = [YMKPoint pointWithLatitude:boundingBoxJS.value().southWest().lat() longitude:boundingBoxJS.value().southWest().lon()];
        YMKPoint *northEast = [YMKPoint pointWithLatitude:boundingBoxJS.value().northEast().lat() longitude:boundingBoxJS.value().northEast().lon()];

        boundingBox = [YMKBoundingBox boundingBoxWithSouthWest:southWest northEast:northEast];
    }

    [self suggestImpl:query options:opt boundingBox:boundingBox resolver:resolve rejecter:reject];
}

- (void)reset:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
    [self resetImpl:resolve];
}

#else

// Old architecture

RCT_EXPORT_METHOD(suggest:(nonnull NSString*) query resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self suggestImpl:query options:_defaultSuggestOptions boundingBox:_defaultBoundingBox resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(suggestWithOptions:(nonnull NSString*) query options:(NSDictionary *) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
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

    [self suggestImpl:query options:opt boundingBox:boundingBox resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(reset: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self resetImpl:resolve];
}

#endif

RCT_EXPORT_MODULE()

@end
