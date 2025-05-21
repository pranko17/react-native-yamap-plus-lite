import {RefObject, useCallback} from 'react';
import {ALL_MASSTRANSIT_VEHICLES, Animation} from '../interfaces';
import {CallbacksManager} from '../utils';
import {findNodeHandle, Platform, UIManager} from 'react-native';
import {YamapNativeRef, YamapRef} from '../components/Yamap';

const getCommand = (cmd: string) =>
  Platform.OS === 'ios' ? UIManager.getViewManagerConfig('YamapView').Commands[cmd] : cmd;

const dispatchCommand = (mapRef: RefObject<YamapNativeRef | null>, command: string, args: Array<any>) => {
  UIManager.dispatchViewManagerCommand(
    findNodeHandle(mapRef.current),
    getCommand(command),
    args
  );
};

export const useYamap = (mapRef: RefObject<YamapNativeRef | null>) => {
  const _findRoutes = useCallback<YamapRef['findRoutes']>((points, vehicles, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    const args = Platform.OS === 'ios' ? [{points, vehicles, id: cbId}] : [points, vehicles, cbId];

    dispatchCommand(mapRef, 'findRoutes', args);
  }, [mapRef]);

  const findRoutes = useCallback<YamapRef['findRoutes']>((points, vehicles, callback) => {
    _findRoutes(points, vehicles, callback);
  }, [_findRoutes]);

  const findMasstransitRoutes = useCallback<YamapRef['findMasstransitRoutes']>((points, callback) => {
    _findRoutes(points, ALL_MASSTRANSIT_VEHICLES, callback);
  }, [_findRoutes]);

  const findPedestrianRoutes = useCallback<YamapRef['findPedestrianRoutes']>((points, callback) => {
    _findRoutes(points, [], callback);
  }, [_findRoutes]);

  const findDrivingRoutes = useCallback<YamapRef['findDrivingRoutes']>((points, callback) => {
    _findRoutes(points, ['car'], callback);
  }, [_findRoutes]);

  const fitAllMarkers = useCallback<YamapRef['fitAllMarkers']>(() => {
    dispatchCommand(mapRef, 'fitAllMarkers', []);
  }, [mapRef]);

  const fitMarkers = useCallback<YamapRef['fitMarkers']>((points) => {
    dispatchCommand(mapRef, 'fitMarkers', [points]);
  }, [mapRef]);

  const setTrafficVisible = useCallback<YamapRef['setTrafficVisible']>((isVisible) => {
    dispatchCommand(mapRef, 'setTrafficVisible', [isVisible]);
  }, [mapRef]);

  const setCenter = useCallback<YamapRef['setCenter']>((
    center,
    zoom = center.zoom || 10,
    azimuth = 0,
    tilt = 0,
    duration = 0,
    animation = Animation.SMOOTH
  ) => {
    dispatchCommand(mapRef, 'setCenter', [center, zoom, azimuth, tilt, duration, animation]);
  }, [mapRef]);

  const setZoom = useCallback<YamapRef['setZoom']>((zoom, duration = 0, animation = Animation.SMOOTH) => {
    dispatchCommand(mapRef, 'setZoom', [zoom, duration, animation]);
  }, [mapRef]);

  const getCameraPosition = useCallback<YamapRef['getCameraPosition']>((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand(mapRef, 'getCameraPosition', [cbId]);
  }, [mapRef]);

  const getVisibleRegion = useCallback<YamapRef['getVisibleRegion']>((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand(mapRef, 'getVisibleRegion', [cbId]);
  }, [mapRef]);

  const getScreenPoints = useCallback<YamapRef['getScreenPoints']>((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand(mapRef, 'getScreenPoints', [points, cbId]);
  }, [mapRef]);

  const getWorldPoints = useCallback<YamapRef['getWorldPoints']>((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand(mapRef, 'getWorldPoints', [points, cbId]);
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
