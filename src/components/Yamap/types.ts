import {ImageSourcePropType, ViewProps} from 'react-native';
import {
  Animation,
  CameraPosition,
  CameraPositionCallback,
  DrivingInfo,
  InitialRegion,
  MapLoaded,
  MasstransitInfo,
  NativeSyntheticEventCallback,
  Point,
  RoutesFoundCallback,
  ScreenPoint,
  ScreenPointsCallback,
  Vehicles,
  VisibleRegionCallback,
  WorldPointsCallback,
  YandexLogoPadding,
  YandexLogoPosition,
} from '../../interfaces';

export interface YamapProps extends ViewProps {
  userLocationIcon?: ImageSourcePropType;
  userLocationIconScale?: number;
  showUserPosition?: boolean;
  nightMode?: boolean;
  mapStyle?: string;
  onCameraPositionChange?: NativeSyntheticEventCallback<CameraPosition>;
  onCameraPositionChangeEnd?: NativeSyntheticEventCallback<CameraPosition>;
  onMapPress?: NativeSyntheticEventCallback<Point>;
  onMapLongPress?: NativeSyntheticEventCallback<Point>;
  onMapLoaded?: NativeSyntheticEventCallback<MapLoaded>;
  userLocationAccuracyFillColor?: string;
  userLocationAccuracyStrokeColor?: string;
  userLocationAccuracyStrokeWidth?: number;
  scrollGesturesEnabled?: boolean;
  zoomGesturesEnabled?: boolean;
  tiltGesturesEnabled?: boolean;
  rotateGesturesEnabled?: boolean;
  fastTapEnabled?: boolean;
  initialRegion?: InitialRegion;
  followUser?: boolean;
  logoPosition?: YandexLogoPosition;
  logoPadding?: YandexLogoPadding;
}

export type YamapRef = {
  setCenter: (
    center: { lon: number, lat: number, zoom?: number },
    zoom?: number,
    azimuth?: number,
    tilt?: number,
    duration?: number,
    animation?: Animation
  ) => void;
  fitAllMarkers: (duration?: number, animation?: Animation) => void;
  fitMarkers: (points: Point[], duration?: number, animation?: Animation) => void;
  findRoutes: (
    points: Point[],
    vehicles: Vehicles[],
    callback:
      RoutesFoundCallback<DrivingInfo> |
      RoutesFoundCallback<MasstransitInfo> |
      RoutesFoundCallback<DrivingInfo | MasstransitInfo>
  ) => void;
  setZoom: (zoom: number, duration: number, animation: Animation) => void;
  getCameraPosition: (callback: CameraPositionCallback) => void;
  getVisibleRegion: (callback: VisibleRegionCallback) => void;
  setTrafficVisible: (isVisible: boolean) => void;
  getScreenPoints: (points: Point[], callback: ScreenPointsCallback) => void;
  getWorldPoints: (points: ScreenPoint[], callback: WorldPointsCallback) => void;

  findMasstransitRoutes: (points: Point[], callback: RoutesFoundCallback<MasstransitInfo>) => void;
  findPedestrianRoutes: (points: Point[], callback: RoutesFoundCallback<MasstransitInfo>) => void;
  findDrivingRoutes: (points: Point[], callback: RoutesFoundCallback<DrivingInfo>) => void;
};
