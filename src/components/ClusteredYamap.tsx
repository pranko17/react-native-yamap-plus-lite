import React, {Component} from 'react';
import {
  Platform,
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  ListRenderItemInfo,
  NativeMethods,
} from 'react-native';
import {
  Animation,
  Point,
  DrivingInfo,
  MasstransitInfo,
  RoutesFoundEvent,
  Vehicles,
  CameraPosition,
  VisibleRegion,
  ScreenPoint,
  ALL_MASSTRANSIT_VEHICLES,
} from '../interfaces';
import {CallbacksManager, getImageUri, getProcessedColors, OmitEx} from '../utils';
import {
  onCameraPositionReceived,
  onRouteFound, onScreenToWorldPointsReceived,
  onVisibleRegionReceived,
  onWorldToScreenPointsReceived,
  YamapProps,
} from './Yamap';

export interface ClusteredYamapProps<T = any> extends YamapProps {
  clusterColor?: string;
  clusteredMarkers: ReadonlyArray<{point: Point, data: T}>
  renderMarker: (info: {point: Point, data: ListRenderItemInfo<T>}, index: number) => React.ReactElement
}

export type ClusteredYamapNativeComponentProps = OmitEx<ClusteredYamapProps, 'userLocationIcon' | 'clusteredMarkers'> & {
  userLocationIcon: string | undefined;
  clusteredMarkers: Point[];
};

const YaMapNativeComponent =
  requireNativeComponent<ClusteredYamapNativeComponentProps>('ClusteredYamapView');

export class ClusteredYamap extends React.Component<ClusteredYamapProps, {}> {
  static defaultProps = {
    showUserPosition: true,
    clusterColor: 'red',
  };

  map = React.createRef<Component<ClusteredYamapNativeComponentProps, {}, any> & Readonly<NativeMethods>>();

  public findRoutes(points: Point[], vehicles: Vehicles[], callback: (event: RoutesFoundEvent<DrivingInfo | MasstransitInfo>) => void) {
    this._findRoutes(points, vehicles, callback);
  }

  public findMasstransitRoutes(points: Point[], callback: (event: RoutesFoundEvent<MasstransitInfo>) => void) {
    this._findRoutes(points, ALL_MASSTRANSIT_VEHICLES, callback);
  }

  public findPedestrianRoutes(points: Point[], callback: (event: RoutesFoundEvent<MasstransitInfo>) => void) {
    this._findRoutes(points, [], callback);
  }

  public findDrivingRoutes(points: Point[], callback: (event: RoutesFoundEvent<DrivingInfo>) => void) {
    this._findRoutes(points, ['car'], callback);
  }

  public fitAllMarkers() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('fitAllMarkers'),
      []
    );
  }

  public setTrafficVisible(isVisible: boolean) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('setTrafficVisible'),
      [isVisible]
    );
  }

  public fitMarkers(points: Point[]) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('fitMarkers'),
      [points]
    );
  }

  public setCenter(center: { lon: number, lat: number, zoom?: number }, zoom: number = center.zoom || 10, azimuth: number = 0, tilt: number = 0, duration: number = 0, animation: Animation = Animation.SMOOTH) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('setCenter'),
      [center, zoom, azimuth, tilt, duration, animation]
    );
  }

  public setZoom(zoom: number, duration: number = 0, animation: Animation = Animation.SMOOTH) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('setZoom'),
      [zoom, duration, animation]
    );
  }

  public getCameraPosition(callback: (position: CameraPosition) => void) {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('getCameraPosition'),
      [cbId]
    );
  }

  public getVisibleRegion(callback: (visibleRegion: VisibleRegion) => void) {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('getVisibleRegion'),
      [cbId]
    );
  }

  public getScreenPoints(points: Point[], callback: (result: {screenPoints: ScreenPoint[]}) => void) {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('getScreenPoints'),
      [points, cbId]
    );
  }

  public getWorldPoints(points: ScreenPoint[], callback: (result: {worldPoints: Point[]}) => void) {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('getWorldPoints'),
      [points, cbId]
    );
  }

  private _findRoutes(points: Point[], vehicles: Vehicles[], callback: ((event: RoutesFoundEvent<DrivingInfo | MasstransitInfo>) => void) | ((event: RoutesFoundEvent<DrivingInfo>) => void) | ((event: RoutesFoundEvent<MasstransitInfo>) => void)) {
    const cbId = CallbacksManager.addCallback(callback);
    const args = Platform.OS === 'ios' ? [{ points, vehicles, id: cbId }] : [points, vehicles, cbId];

    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      this.getCommand('findRoutes'),
      args
    );
  }

  private getCommand(cmd: string): any {
    return Platform.OS === 'ios' ? UIManager.getViewManagerConfig('ClusteredYamapView').Commands[cmd] : cmd;
  }

  private getProps() {
    return getProcessedColors({
      ...this.props,
      onRouteFound,
      onCameraPositionReceived,
      onVisibleRegionReceived,
      onWorldToScreenPointsReceived,
      onScreenToWorldPointsReceived,
      userLocationIcon: getImageUri(this.props.userLocationIcon),
      clusteredMarkers: this.props.clusteredMarkers.map(mark => mark.point),
      children: this.props.clusteredMarkers.map(this.props.renderMarker),
    }, ['clusterColor', 'userLocationAccuracyFillColor', 'userLocationAccuracyStrokeColor']);
  }

  render() {
    return (
      <YaMapNativeComponent
        {...this.getProps()}
        ref={this.map}
      />
    );
  }
}
