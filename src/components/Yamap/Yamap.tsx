import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef} from 'react';
import {
  Platform,
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from 'react-native';
import {
  Point,
  DrivingInfo,
  MasstransitInfo,
  RoutesFoundCallback,
  Vehicles,
  Animation,
  ALL_MASSTRANSIT_VEHICLES,
} from '../../interfaces';
import {CallbacksManager, getImageUri, getProcessedColors} from '../../utils';
import {YamapNativeComponentProps, YamapNativeRef, YamapProps, YamapRef} from './types';
import {
  onCameraPositionReceived,
  onRouteFound,
  onScreenToWorldPointsReceived,
  onVisibleRegionReceived,
  onWorldToScreenPointsReceived,
} from './events';

const YamapNativeComponent = requireNativeComponent<YamapNativeComponentProps>('YamapView');

export const YaMap = forwardRef<YamapRef, YamapProps>(({
    showUserPosition = true,
    ...props
  }, ref) => {

  const mapRef = useRef<YamapNativeRef | null>(null);

  const _findRoutes =  useCallback((points: Point[], vehicles: Vehicles[], callback: RoutesFoundCallback<DrivingInfo> | RoutesFoundCallback<MasstransitInfo> | RoutesFoundCallback<DrivingInfo | MasstransitInfo>) => {
    const cbId = CallbacksManager.addCallback(callback);
    const args = Platform.OS === 'ios' ? [{ points, vehicles, id: cbId }] : [points, vehicles, cbId];

    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('findRoutes'),
      args
    );
  }, []);

  const findRoutes: YamapRef['findRoutes']  = useCallback((points, vehicles, callback) => {
    _findRoutes(points, vehicles, callback);
  }, [_findRoutes]);

  const findMasstransitRoutes: YamapRef['findMasstransitRoutes'] = useCallback((points, callback) => {
    _findRoutes(points, ALL_MASSTRANSIT_VEHICLES, callback);
  }, [_findRoutes]);

  const findPedestrianRoutes: YamapRef['findPedestrianRoutes'] = useCallback((points, callback) => {
    _findRoutes(points, [], callback);
  }, [_findRoutes]);

  const findDrivingRoutes: YamapRef['findDrivingRoutes'] = useCallback((points, callback) => {
    _findRoutes(points, ['car'], callback);
  }, [_findRoutes]);

  const fitAllMarkers: YamapRef['fitAllMarkers'] = useCallback(() => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('fitAllMarkers'),
      []
    );
  }, []);

  const setTrafficVisible: YamapRef['setTrafficVisible'] = useCallback((isVisible: boolean) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('setTrafficVisible'),
      [isVisible]
    );
  }, []);

  const fitMarkers: YamapRef['fitMarkers'] = useCallback((points) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('fitMarkers'),
      [points]
    );
  }, []);

  const setCenter: YamapRef['setCenter'] = useCallback((
    center,
    zoom = center.zoom || 10,
    azimuth = 0,
    tilt = 0,
    duration = 0,
    animation = Animation.SMOOTH
  ) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('setCenter'),
      [center, zoom, azimuth, tilt, duration, animation]
    );
  }, []);

  const setZoom: YamapRef['setZoom'] = useCallback((zoom, duration = 0, animation = Animation.SMOOTH) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('setZoom'),
      [zoom, duration, animation]
    );
  }, []);

  const getCameraPosition: YamapRef['getCameraPosition'] = useCallback((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getCameraPosition'),
      [cbId]
    );
  }, []);

  const getVisibleRegion: YamapRef['getVisibleRegion'] = useCallback((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getVisibleRegion'),
      [cbId]
    );
  }, []);

  const getScreenPoints: YamapRef['getScreenPoints'] = useCallback((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getScreenPoints'),
      [points, cbId]
    );
  }, []);

  const getWorldPoints: YamapRef['getWorldPoints'] = useCallback((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getWorldPoints'),
      [points, cbId]
    );
  }, []);

  useImperativeHandle(ref, () => ({
    setCenter,
    fitAllMarkers,
    fitMarkers,
    findRoutes,
    setZoom,
    getCameraPosition,
    getVisibleRegion,
    setTrafficVisible,
    getScreenPoints,
    getWorldPoints,
    findMasstransitRoutes,
    findPedestrianRoutes,
    findDrivingRoutes,
  }), [
    setCenter,
    fitAllMarkers,
    fitMarkers,
    findRoutes,
    setZoom,
    getCameraPosition,
    getVisibleRegion,
    setTrafficVisible,
    getScreenPoints,
    getWorldPoints,
    findMasstransitRoutes,
    findPedestrianRoutes,
    findDrivingRoutes,
  ]);

  const getCommand = (cmd: string) =>
    Platform.OS === 'ios' ? UIManager.getViewManagerConfig('YamapView').Commands[cmd] : cmd;

  const nativeProps = useMemo(() =>
      getProcessedColors({
        ...props,
        onRouteFound,
        onCameraPositionReceived,
        onVisibleRegionReceived,
        onWorldToScreenPointsReceived,
        onScreenToWorldPointsReceived,
        showUserPosition,
        userLocationIcon: getImageUri(props.userLocationIcon),
      }, ['userLocationAccuracyFillColor', 'userLocationAccuracyStrokeColor']),
    [props, showUserPosition]
  );

  return (
    <YamapNativeComponent
      {...nativeProps}
      ref={mapRef}
    />
  );
});
