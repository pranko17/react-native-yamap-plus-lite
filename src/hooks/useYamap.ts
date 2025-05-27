import {ForwardedRef, RefObject, useCallback, useImperativeHandle} from 'react';
import {ALL_MASSTRANSIT_VEHICLES, Animation} from '../interfaces';
import {CallbacksManager} from '../utils';
import {findNodeHandle, Platform, UIManager} from 'react-native';
import {YamapRef} from '../components';
import {YamapNativeRef} from '../spec/YamapNativeComponent';

export const useYamap = (
  nativeRef: RefObject<YamapNativeRef | null>,
  ref: ForwardedRef<YamapRef>,
  componentName: 'YamapView' | 'ClusteredYamapView'
) => {
  const getCommand = useCallback((cmd: string) =>
    Platform.OS === 'ios' ? UIManager.getViewManagerConfig(componentName).Commands[cmd] : cmd,
  [componentName]);

  const dispatchCommand = useCallback((command: string, args: Array<any>) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeRef.current),
      getCommand(command),
      args
    );
  }, [getCommand, nativeRef]);

  const _findRoutes = useCallback<YamapRef['findRoutes']>((points, vehicles, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    const args = Platform.OS === 'ios' ? [{points, vehicles, id: cbId}] : [points, vehicles, cbId];

    dispatchCommand('findRoutes', args);
  }, [dispatchCommand]);

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
    dispatchCommand('fitAllMarkers', []);
  }, [dispatchCommand]);

  const fitMarkers = useCallback<YamapRef['fitMarkers']>((points) => {
    dispatchCommand('fitMarkers', [points]);
  }, [dispatchCommand]);

  const setTrafficVisible = useCallback<YamapRef['setTrafficVisible']>((isVisible) => {
    dispatchCommand('setTrafficVisible', [isVisible]);
  }, [dispatchCommand]);

  const setCenter = useCallback<YamapRef['setCenter']>((
    center,
    zoom = center.zoom || 10,
    azimuth = 0,
    tilt = 0,
    duration = 0,
    animation = Animation.SMOOTH
  ) => {
    dispatchCommand('setCenter', [center, zoom, azimuth, tilt, duration, animation]);
  }, [dispatchCommand]);

  const setZoom = useCallback<YamapRef['setZoom']>((zoom, duration = 0, animation = Animation.SMOOTH) => {
    dispatchCommand('setZoom', [zoom, duration, animation]);
  }, [dispatchCommand]);

  const getCameraPosition = useCallback<YamapRef['getCameraPosition']>((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand('getCameraPosition', [cbId]);
  }, [dispatchCommand]);

  const getVisibleRegion = useCallback<YamapRef['getVisibleRegion']>((callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand('getVisibleRegion', [cbId]);
  }, [dispatchCommand]);

  const getScreenPoints = useCallback<YamapRef['getScreenPoints']>((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand('getScreenPoints', [points, cbId]);
  }, [dispatchCommand]);

  const getWorldPoints = useCallback<YamapRef['getWorldPoints']>((points, callback) => {
    const cbId = CallbacksManager.addCallback(callback);
    dispatchCommand('getWorldPoints', [points, cbId]);
  }, [dispatchCommand]);

  useImperativeHandle(ref, () => ({
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
  }), [
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
  ]);
};
