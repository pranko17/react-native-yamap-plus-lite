import {ForwardedRef, useCallback, useImperativeHandle, useRef} from 'react';
import {findNodeHandle, Platform, UIManager} from 'react-native';
import {Point} from '../interfaces';
import {MarkerNativeRef} from '../components/Marker/MarkerNativeComponent';
import {MarkerRef} from '../components/Marker';

const getCommand = (cmd: string) => {
  return Platform.OS === 'ios' ? UIManager.getViewManagerConfig('YamapMarker').Commands[cmd] : cmd;
};

export const useMarker = (ref: ForwardedRef<MarkerRef>) => {
  const nativeRef = useRef<MarkerNativeRef | null>(null);

  const animatedMoveTo = useCallback((coords: Point, duration: number) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeRef.current),
      getCommand('animatedMoveTo'),
      [coords, duration]
    );
  }, []);

  const animatedRotateTo = useCallback((angle: number, duration: number) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeRef.current),
      getCommand('animatedRotateTo'),
      [angle, duration]
    );
  }, []);

  useImperativeHandle(ref, () => ({
    animatedMoveTo,
    animatedRotateTo,
  }), [animatedMoveTo, animatedRotateTo]);

  return {nativeRef};
};
