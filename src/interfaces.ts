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

export interface Anchor {
  x: number;
  y: number;
}

export interface YandexClusterSizes {
  width?: number;
  height?: number;
};
