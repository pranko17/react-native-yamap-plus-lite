import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {TurboModule, TurboModuleRegistry} from 'react-native';
import {Address, BoundingBox} from '../interfaces';

export enum SearchType {
  YMKSearchTypeUnspecified, // Toponyms
  YMKSearchTypeGeo, // Companies
  YMKSearchTypeBiz, // Mass transit routes
}

enum GeoFigureType {
  POINT = 'POINT',
  BOUNDINGBOX = 'BOUNDINGBOX',
  POLYLINE = 'POLYLINE',
  POLYGON = 'POLYGON',
}

export interface Point {
  lat: Double;
  lon: Double;
}

export interface PointParams {
  type: GeoFigureType.POINT
  value: Point
}

export interface BoundingBoxParams {
  type: GeoFigureType.BOUNDINGBOX
  value: BoundingBox
}

export interface PolylineParams {
  type: GeoFigureType.POLYLINE
  value: Point[]
}

export interface PolygonParams {
  type: GeoFigureType.POLYGON
  value: Point[]
}

type FigureParams = PointParams | BoundingBoxParams | PolylineParams | PolygonParams

export interface SearchOptions {
  disableSpellingCorrection?: boolean;
  geometry?: boolean;
  snippets?: SearchType;
  searchTypes?: SearchType;
}

export interface YamapSearch {
  title: string;
  subtitle?: string;
  uri?: string;
}

interface Spec extends TurboModule {
  searchByAddress(query: string, figure?: FigureParams, options?: SearchOptions): Promise<Array<YamapSearch>>
  searchByPoint(point: Point, zoom?: Double, options?: SearchOptions): Promise<Address>
  geoToAddress(point: Point): Promise<Address>
  addressToGeo(address: string): Promise<Point>
  resolveURI(query: string, options?: SearchOptions): Promise<Array<YamapSearch>>
  searchByURI(query: string, options?: SearchOptions): Promise<Array<YamapSearch>>
}

export default TurboModuleRegistry.getEnforcing<Spec>('RTNSearchModule');
