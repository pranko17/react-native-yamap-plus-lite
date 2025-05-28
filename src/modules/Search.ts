import NativeSearchModule from '../spec/NativeSearchModule';

export const Search = {
  searchText: NativeSearchModule.searchByAddress,
  searchPoint: NativeSearchModule.searchByPoint,
  geocodePoint: NativeSearchModule.geoToAddress,
  geocodeAddress: NativeSearchModule.addressToGeo,
  resolveURI: NativeSearchModule.resolveURI,
  searchByURI: NativeSearchModule.searchByURI,
};
