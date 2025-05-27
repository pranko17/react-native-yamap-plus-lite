import {ImageSourcePropType} from 'react-native';
import {
  Animation,
  CameraPositionCallback,
  DrivingInfo,
  MasstransitInfo,
  Point,
  RoutesFoundCallback,
  ScreenPoint,
  ScreenPointsCallback,
  Vehicles,
  VisibleRegionCallback,
  WorldPointsCallback,
} from '../../interfaces';
import {OmitEx} from '../../utils';
import {YamapNativeProps} from '../../spec/YamapNativeComponent';

export type YamapProps = OmitEx<YamapNativeProps, 'userLocationIcon'> & {
  userLocationIcon?: ImageSourcePropType;
}

export type YamapRef = {
  setCenter: (
    center: Point,
    zoom?: number,
    azimuth?: number,
    tilt?: number,
    duration?: number,
    animation?: Animation
  ) => void;
  fitAllMarkers: () => void;
  fitMarkers: (points: Point[]) => void;
  findRoutes: (
    points: Point[],
    vehicles: Vehicles[],
    callback:
      RoutesFoundCallback<DrivingInfo> |
      RoutesFoundCallback<MasstransitInfo> |
      RoutesFoundCallback<DrivingInfo | MasstransitInfo>
  ) => void;
  setZoom: (zoom: number, duration?: number, animation?: Animation) => void;
  getCameraPosition: (callback: CameraPositionCallback) => void;
  getVisibleRegion: (callback: VisibleRegionCallback) => void;
  setTrafficVisible: (isVisible: boolean) => void;
  getScreenPoints: (points: Point[], callback: ScreenPointsCallback) => void;
  getWorldPoints: (points: ScreenPoint[], callback: WorldPointsCallback) => void;

  findMasstransitRoutes: (points: Point[], callback: RoutesFoundCallback<MasstransitInfo>) => void;
  findPedestrianRoutes: (points: Point[], callback: RoutesFoundCallback<MasstransitInfo>) => void;
  findDrivingRoutes: (points: Point[], callback: RoutesFoundCallback<DrivingInfo>) => void;
};
