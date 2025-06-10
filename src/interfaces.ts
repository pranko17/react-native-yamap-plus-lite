import {NativeSyntheticEvent} from 'react-native';
import {CameraPosition} from './spec/YamapNativeComponent';

export interface Point {
  lat: number;
  lon: number;
}

export interface BoundingBox {
  southWest: Point;
  northEast: Point;
}

export type WorldPointsCallback = (result: {worldPoints: Point[]}) => void

export interface ScreenPoint {
  x: number;
  y: number;
}

export type ScreenPointsCallback = (result: {screenPoints: ScreenPoint[]}) => void

export type MasstransitVehicles = 'bus' | 'trolleybus' | 'tramway' | 'minibus' | 'suburban' | 'underground' | 'ferry' | 'cable' | 'funicular';

export type Vehicles = MasstransitVehicles | 'walk' | 'car';

export const ALL_MASSTRANSIT_VEHICLES: Vehicles[] = [
  'bus',
  'trolleybus',
  'tramway',
  'minibus',
  'suburban',
  'underground',
  'ferry',
  'cable',
  'funicular',
] as const;

export interface DrivingInfo {
  time: string;
  timeWithTraffic: string;
  distance: number;
}

export interface MasstransitInfo {
  time: string;
  transferCount: number;
  walkingDistance: number;
}

export interface RouteInfo<T extends (DrivingInfo | MasstransitInfo)> {
  id: string;
  sections: {
    points: Point[];
    sectionInfo: T;
    routeInfo: T;
    routeIndex: number;
    stops: any[];
    type: string;
    transports?: any;
    sectionColor?: string;
  }[];
}

export interface RoutesFoundEvent<T extends (DrivingInfo | MasstransitInfo)> {
  nativeEvent: {
    status: 'success' | 'error';
    id: string;
    routes: RouteInfo<T>[];
  };
}

export type RoutesFoundCallback<T extends (DrivingInfo | MasstransitInfo)> = (event: RoutesFoundEvent<T>) => void

export type CameraPositionCallback = (position: CameraPosition) => void

export type NativeSyntheticEventCallback<T extends any> = (event: NativeSyntheticEvent<T>) => void

export type VisibleRegion = {
  bottomLeft: Point;
  bottomRight: Point;
  topLeft: Point;
  topRight: Point;
}

export type VisibleRegionCallback = (visibleRegion: VisibleRegion) => void

export enum Animation {
  SMOOTH,
  LINEAR
}

export enum AddressKind {
  UNKNOWN,
  COUNTRY,
  REGION,
  PROVINCE,
  AREA,
  LOCALITY,
  DISTRICT,
  STREET,
  HOUSE,
  ENTRANCE,
  LEVEL,
  APARTMENT,
  ROUTE,
  STATION,
  METRO_STATION,
  RAILWAY_STATION,
  VEGETATION,
  HYDRO,
  AIRPORT,
  OTHER,
}

export interface Address {
  Components: Array<{name: string; kind: AddressKind}>
  country_code: string
  formatted: string
  point: Point
  uri: string
}
