import codegenNativeComponent, {NativeComponentType} from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import {
  BubblingEventHandler,
  DirectEventHandler,
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import {NativeMethods, ViewProps} from 'react-native';
import {Component} from 'react';
import {Animation, ScreenPoint, Vehicles} from '../interfaces';

interface MapLoaded {
  renderObjectCount: Double;
  curZoomModelsLoaded: Double;
  curZoomPlacemarksLoaded: Double;
  curZoomLabelsLoaded: Double;
  curZoomGeometryLoaded: Double;
  tileMemoryUsage: Double;
  delayedGeometryLoaded: Double;
  fullyAppeared: Double;
  fullyLoaded: Double;
}

interface InitialRegion {
  lat: Double;
  lon: Double;
  zoom?: Double;
  azimuth?: Double;
  tilt?: Double;
}

interface YandexLogoPosition {
  horizontal?: WithDefault<'left' | 'center' | 'right', 'left'>;
  vertical?: WithDefault<'top' | 'bottom', 'bottom'>;
}

interface YandexLogoPadding {
  horizontal?: Double;
  vertical?: Double;
}

interface Point {
  lat: Double;
  lon: Double;
}

export interface CameraPosition {
  lat: Double;
  lon: Double;
  azimuth: Double;
  finished: Double;
  reason: string;
  tilt: Double;
  zoom: Double;
}

export interface ClusteredYamapNativeProps extends ViewProps {
  userLocationIconScale?: Double;
  showUserPosition?: boolean;
  nightMode?: boolean;
  mapStyle?: string;
  onCameraPositionChange?: DirectEventHandler<CameraPosition>;
  onCameraPositionChangeEnd?: DirectEventHandler<CameraPosition>;
  onMapPress?: BubblingEventHandler<Point>;
  onMapLongPress?: BubblingEventHandler<Point>;
  onMapLoaded?: DirectEventHandler<MapLoaded>;
  userLocationAccuracyFillColor?: string;
  userLocationAccuracyStrokeColor?: string;
  userLocationAccuracyStrokeWidth?: Double;
  scrollGesturesEnabled?: boolean;
  zoomGesturesEnabled?: boolean;
  tiltGesturesEnabled?: boolean;
  rotateGesturesEnabled?: boolean;
  fastTapEnabled?: boolean;
  initialRegion?: InitialRegion;
  followUser?: boolean;
  logoPosition?: YandexLogoPosition;
  logoPadding?: YandexLogoPadding;
  userLocationIcon: string | undefined;

  clusteredMarkers: Point[];
  clusterColor?: string;
}

export type ClusteredYamapNativeRef = Component<ClusteredYamapNativeProps, {}, any> & Readonly<NativeMethods>
export type ClusteredYamapComponentType = NativeComponentType<ClusteredYamapNativeProps> & Readonly<ClusteredYamapNativeCommands>;

export interface ClusteredYamapNativeCommands {
  setCenter: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      duration: Double;
      center: Point,
      zoom: Double;
      azimuth: Double;
      tilt: Double;
      animation: Animation
    }>>,
  ) => void;
  fitAllMarkers: (viewRef: React.ElementRef<ClusteredYamapComponentType>, args: Array<Readonly<{}>>) => void;
  fitMarkers: (viewRef: React.ElementRef<ClusteredYamapComponentType>, points: Array<Readonly<{points: Point[]}>>) => void;
  findRoutes: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: Point[],
      vehicles: Vehicles[],
      id: string
    }>>
  ) => void;
  setZoom: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      zoom: Double
      duration: Double,
      animation: Animation,
    }>>
  ) => void;
  getCameraPosition: (viewRef: React.ElementRef<ClusteredYamapComponentType>, args: Array<Readonly<{id: string}>>) => void;
  getVisibleRegion: (viewRef: React.ElementRef<ClusteredYamapComponentType>, args: Array<Readonly<{id: string}>>) => void;
  setTrafficVisible: (viewRef: React.ElementRef<ClusteredYamapComponentType>, args: Array<Readonly<{isVisible: boolean}>>) => void;
  getScreenPoints: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: Point[]
      id: string
    }>>
  ) => void;
  getWorldPoints: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: ScreenPoint[]
      id: string
    }>>
  ) => void;

  findMasstransitRoutes: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: Point[]
      id: string
    }>>
  ) => void;
  findPedestrianRoutes: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: Point[]
      id: string
    }>>
  ) => void;
  findDrivingRoutes: (
    viewRef: React.ElementRef<ClusteredYamapComponentType>,
    args: Array<Readonly<{
      points: Point[]
      id: string
    }>>
  ) => void;
}

export const Commands = codegenNativeCommands<ClusteredYamapNativeCommands>({
  supportedCommands: [
    'setCenter',
    'fitAllMarkers',
    'fitMarkers',
    'findRoutes',
    'setZoom',
    'getCameraPosition',
    'getVisibleRegion',
    'setTrafficVisible',
    'getScreenPoints',
    'getWorldPoints',
    'findMasstransitRoutes',
    'findPedestrianRoutes',
    'findDrivingRoutes',
  ],
});

export default codegenNativeComponent<ClusteredYamapNativeProps>('ClusteredYamapView');
