import { ForwardedRef, RefObject, useCallback, useImperativeHandle } from 'react';
import { findNodeHandle, Platform, UIManager } from 'react-native';
import { YamapRef } from '../components/Yamap';
import { YamapNativeRef } from '../components/Yamap/YamapNativeComponent';
import { Animation } from '../interfaces';
import { CallbacksManager } from '../utils';

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

  const fitAllMarkers = useCallback<YamapRef['fitAllMarkers']>((duration, animation) => {
    dispatchCommand('fitAllMarkers', [duration ?? (Platform.OS === 'ios' ? 1 : 0.7), animation ?? Animation.SMOOTH]);
  }, [dispatchCommand]);

  const fitMarkers = useCallback<YamapRef['fitMarkers']>((points, duration, animation) => {
    dispatchCommand('fitMarkers', [points, duration ?? (Platform.OS === 'ios' ? 1 : 0.7), animation ?? Animation.SMOOTH]);
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
