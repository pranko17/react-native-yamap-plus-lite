import codegenNativeComponent, {NativeComponentType} from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  BubblingEventHandler,
  DirectEventHandler,
  Double,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import {NativeMethods, ViewProps} from 'react-native';
import {Component} from 'react';
import {YamapNativeCommands} from './commands/yamap';

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
  clusterColor?: Int32;
}

export type ClusteredYamapNativeRef = Component<ClusteredYamapNativeProps, {}, any> & Readonly<NativeMethods>
export type ClusteredYamapComponentType = NativeComponentType<ClusteredYamapNativeProps> & Readonly<YamapNativeCommands>;

require('./commands/yamap');

export default codegenNativeComponent<ClusteredYamapNativeProps>('ClusteredYamapView');
