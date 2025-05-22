import {NativeSyntheticEvent} from 'react-native';

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

export interface MapLoaded {
  renderObjectCount: number;
  curZoomModelsLoaded: number;
  curZoomPlacemarksLoaded: number;
  curZoomLabelsLoaded: number;
  curZoomGeometryLoaded: number;
  tileMemoryUsage: number;
  delayedGeometryLoaded: number;
  fullyAppeared: number;
  fullyLoaded: number;
}

export interface InitialRegion {
  lat: number;
  lon: number;
  zoom?: number;
  azimuth?: number;
  tilt?: number;
}

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

export type MapType = 'none' | 'raster' | 'vector';

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

export type CameraUpdateReason = 'APPLICATION' | 'GESTURES';

export interface CameraPosition {
  azimuth: number;
  finished: boolean;
  point: Point;
  reason: CameraUpdateReason;
  tilt: number;
  zoom: number;
}

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

export type YandexLogoPosition = {
  horizontal?: 'left' | 'center' | 'right';
  vertical?: 'top' | 'bottom';
}

export type YandexLogoPadding = {
  horizontal?: number;
  vertical?: number;
}

export interface Address {
  country_code: string;
  formatted: string;
  postal_code: string;
  Components: {kind: string, name: string}[];
}

export interface Anchor {
  x: number;
  y: number;
}
