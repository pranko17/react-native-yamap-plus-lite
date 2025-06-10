#import <objc/runtime.h>

#import "RTNSearchModule.h"
#import "../Util/RCTConvert+Yamap.m"

@import YandexMapsMobile;

@implementation RTNSearchModule

NSString *ERR_NO_REQUEST_ARG = @"ERR_NO_REQUEST_ARG";
NSString *ERR_SEARCH_FAILED = @"ERR_SEARCH_FAILED";

- (instancetype)init
{
    YMKPoint *southWestPoint = [YMKPoint pointWithLatitude:-90.0 longitude:-180.0];
    YMKPoint *northEastPoint = [YMKPoint pointWithLatitude:90.0 longitude:180.0];
    _defaultBoundingBox = [YMKBoundingBox boundingBoxWithSouthWest:southWestPoint northEast:northEastPoint];
    _searchOptions = [[YMKSearchOptions alloc] init];
    return [super init];
}

- (void) initSearchManager {
    if (_searchManager == nil) {
        dispatch_sync(dispatch_get_main_queue(), ^{
            self->_searchManager = [[YMKSearchFactory instance] createSearchManagerWithSearchManagerType:YMKSearchManagerTypeOnline];
        });
    }
}

- (void) initSearchOptions:(NSDictionary *) options {
    _searchOptions = [_searchOptions init];

    if ([options isKindOfClass:[NSDictionary class]]) {
        for (NSString* key in options) {
            [_searchOptions setValue:options[key] forKey:key];
        }
    }
}

- (YMKGeometry *) getGeometry:(NSDictionary *) figure {
    if (![figure isKindOfClass:[NSDictionary class]]) {
        return [YMKGeometry geometryWithBoundingBox:_defaultBoundingBox];
    }
    if ([figure[@"type"] isEqual:@"POINT"]) {
        return [YMKGeometry geometryWithPoint:[RCTConvert YMKPoint:figure[@"value"]]];
    }
    if ([figure[@"type"] isEqual:@"BOUNDINGBOX"]) {
        YMKPoint *southWest = [RCTConvert YMKPoint:figure[@"value"][@"southWest"]];
        YMKPoint *northEast = [RCTConvert YMKPoint:figure[@"value"][@"northEast"]];
        return [YMKGeometry geometryWithBoundingBox:[YMKBoundingBox boundingBoxWithSouthWest:southWest northEast:northEast]];
    }
    if ([figure[@"type"] isEqual:@"POLYLINE"]) {
        NSMutableArray<YMKPoint*> *points = [RCTConvert Points:figure[@"value"]];
        return [YMKGeometry geometryWithPolyline:[YMKPolyline polylineWithPoints:points]];
    }
    if ([figure[@"type"] isEqual:@"POLYGON"]) {
        NSMutableArray<YMKPoint*> *points = [RCTConvert Points:figure[@"value"]];
        return [YMKGeometry geometryWithPolygon:[YMKPolygon polygonWithOuterRing:[YMKLinearRing linearRingWithPoints:points] innerRings:@[]]];
    }
    return [YMKGeometry geometryWithBoundingBox:_defaultBoundingBox];
}

- (NSMutableDictionary *) convertSearchResponse:(YMKSearchResponse *) search {
    NSMutableDictionary *searchToPass = [[NSMutableDictionary alloc] init];
    NSArray<YMKGeoObjectCollectionItem *> *geoCollectionObjects = [[search collection] children];

    NSObject *metadata = (NSObject *)[[[geoCollectionObjects firstObject].obj metadataContainer] getItemOfClass:[YMKSearchToponymObjectMetadata class]];

    if (metadata != nil) {
        searchToPass[@"formatted"] = [[metadata valueForKey:@"address"] valueForKey:@"formattedAddress"];
        searchToPass[@"country_code"] = [[metadata valueForKey:@"address"] valueForKey:@"countryCode"];
    }

    YMKPoint *point = [[[[geoCollectionObjects firstObject].obj geometry] firstObject] point];
    searchToPass[@"point"] = [RCTConvert pointJsonWithPoint:point];

    NSMutableArray *components = [[NSMutableArray alloc] init];

    for (YMKGeoObjectCollectionItem *geoCollectionObject in geoCollectionObjects) {
        NSMutableDictionary *component = [[NSMutableDictionary alloc] init];
        component[@"name"] = geoCollectionObject.obj.name;
        NSObject *metadata = (NSObject *)[[geoCollectionObject.obj metadataContainer] getItemOfClass:[YMKSearchToponymObjectMetadata class]];
        if (metadata != nil) {
            NSArray<YMKSearchAddressComponent *> *addresseDict = (NSArray<YMKSearchAddressComponent *> *)[[metadata valueForKey:@"address"] components];
            component[@"kind"] = [NSNumber numberWithInt:[[[[addresseDict objectAtIndex:[addresseDict count] - 1] kinds] firstObject] intValue]];
        }
        [components addObject:component];
    }

    searchToPass[@"Components"] = components;

    NSObject *uriMetadata = (NSObject *)[[[geoCollectionObjects firstObject].obj metadataContainer] getItemOfClass:[YMKUriObjectMetadata class]];
    if (uriMetadata) {
        searchToPass[@"uri"] =[[[uriMetadata valueForKey:@"uris"] firstObject] valueForKey:@"value"];
    }

    return searchToPass;
}

RCT_EXPORT_METHOD(searchByAddress:(nonnull NSString*) searchQuery figure:(NSDictionary*)figure options:(NSDictionary*) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self initSearchManager];
    [self initSearchOptions: options];
    YMKGeometry* geometry = [self getGeometry: figure];

    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager submitWithText:searchQuery geometry:geometry searchOptions:self->_searchOptions responseHandler:^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"searchByAddress error:", error);
                return;
            }

            resolve([self convertSearchResponse:response]);
        }];
    });
}

RCT_EXPORT_METHOD(searchByPoint:(nonnull NSDictionary*) point zoom:(nonnull NSNumber*) zoom options:(NSDictionary*) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    YMKPoint *searchPoint = [RCTConvert YMKPoint:point];
    [self initSearchManager];
    [self initSearchOptions: options];
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager submitWithPoint:searchPoint zoom:zoom searchOptions:self->_searchOptions responseHandler:^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"searchByPoint error:", error);
                return;
            }

            resolve([self convertSearchResponse:response]);
        }];
    });
}

RCT_EXPORT_METHOD(addressToGeo:(nonnull NSString*) searchQuery resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self initSearchManager];
    [self initSearchOptions: nil];
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager submitWithText:searchQuery geometry:[YMKGeometry geometryWithBoundingBox:self->_defaultBoundingBox] searchOptions:self->_searchOptions responseHandler: ^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"addressToGeo error:", error);
                return;
            }

            NSArray<YMKGeoObjectCollectionItem *> *geoCollectionObjects = [[response collection] children];
            NSObject *item = (NSObject *)[[[geoCollectionObjects firstObject].obj metadataContainer] getItemOfClass:[YMKSearchToponymObjectMetadata class]];
            if (item != nil) {
                YMKPoint *point = [item valueForKey:@"balloonPoint"];
                resolve([RCTConvert pointJsonWithPoint:point]);
            }
        }];
    });

}

RCT_EXPORT_METHOD(geoToAddress:(nonnull NSDictionary*) point resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    YMKPoint *searchPoint = [RCTConvert YMKPoint:point];
    [self initSearchManager];
    [self initSearchOptions: nil];

    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager submitWithPoint:searchPoint zoom:@10 searchOptions:self->_searchOptions responseHandler:^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"geoToAddress error:", error);
                return;
            }

            resolve([self convertSearchResponse:response]);
        }];
    });
}

RCT_EXPORT_METHOD(searchByURI:(nonnull NSString*) searchUri options:(NSDictionary*) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self initSearchManager];
    [self initSearchOptions: options];

    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager searchByURIWithUri:searchUri searchOptions:self->_searchOptions responseHandler:^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"searchByURI error:", error);
                return;
            }

            resolve([self convertSearchResponse:response]);
        }];
    });
}

RCT_EXPORT_METHOD(resolveURI:(nonnull NSString*) searchUri options:(NSDictionary*) options resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock) reject) {
    [self initSearchManager];
    [self initSearchOptions: options];
    dispatch_async(dispatch_get_main_queue(), ^{
        self->_searchSession = [self->_searchManager resolveURIWithUri:searchUri searchOptions:self->_searchOptions responseHandler:^(YMKSearchResponse * _Nullable response, NSError * _Nullable error) {
            if (error) {
                reject(ERR_SEARCH_FAILED,  @"resolveURI error:", error);
                return;
            }

            resolve([self convertSearchResponse:response]);
        }];
    });
}

RCT_EXPORT_MODULE()

@end
