import {RefObject, useCallback} from 'react';
import {
  ALL_MASSTRANSIT_VEHICLES,
  Animation,
  DrivingInfo,
  MasstransitInfo,
  Point,
  RoutesFoundCallback,
  Vehicles,
} from '../interfaces';
import {CallbacksManager} from '../utils';
import {findNodeHandle, Platform, UIManager} from 'react-native';
import {YamapNativeRef, YamapRef} from '../components/Yamap';

const getCommand = (cmd: string) =>
  Platform.OS === 'ios' ? UIManager.getViewManagerConfig('YamapView').Commands[cmd] : cmd;

export const useYamap = (mapRef: RefObject<YamapNativeRef | null>) => {
  const _findRoutes = useCallback((points: Point[], vehicles: Vehicles[], callback: RoutesFoundCallback<DrivingInfo> | RoutesFoundCallback<MasstransitInfo> | RoutesFoundCallback<DrivingInfo | MasstransitInfo>) => {
    const cbId = CallbacksManager.addCallback(callback);
    const args = Platform.OS === 'ios' ? [{points, vehicles, id: cbId}] : [points, vehicles, cbId];

    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('findRoutes'),
      args
    );
  }, [mapRef]);

  const findRoutes: YamapRef['findRoutes'] = useCallback((points, vehicles, callback) => {
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
  }, [mapRef]);

  const fitMarkers: YamapRef['fitMarkers'] = useCallback((points) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('fitMarkers'),
      [points]
    );
  }, [mapRef]);

  const setTrafficVisible: YamapRef['setTrafficVisible'] = useCallback((isVisible: boolean) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('setTrafficVisible'),
      [isVisible]
    );
  }, [mapRef]);

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
  }, [mapRef]);

  const setZoom: YamapRef['setZoom'] = useCallback((zoom, duration = 0, animation = Animation.SMOOTH) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('setZoom'),
      [zoom, duration, animation]
    );
  }, [mapRef]);

  const getCameraPosition: YamapRef['getCameraPosition'] = useCallback((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getCameraPosition'),
      [cbId]
    );
  }, [mapRef]);

  const getVisibleRegion: YamapRef['getVisibleRegion'] = useCallback((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getVisibleRegion'),
      [cbId]
    );
  }, [mapRef]);

  const getScreenPoints: YamapRef['getScreenPoints'] = useCallback((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getScreenPoints'),
      [points, cbId]
    );
  }, [mapRef]);

  const getWorldPoints: YamapRef['getWorldPoints'] = useCallback((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(mapRef.current),
      getCommand('getWorldPoints'),
      [points, cbId]
    );
  }, [mapRef]);

  return {
    findRoutes,
    findMasstransitRoutes,
    findPedestrianRoutes,
    findDrivingRoutes,
    fitAllMarkers,
    fitMarkers,
    setTrafficVisible,
    setCenter,
    setZoom,
    getCameraPosition,
    getVisibleRegion,
    getScreenPoints,
    getWorldPoints,
  };
};
