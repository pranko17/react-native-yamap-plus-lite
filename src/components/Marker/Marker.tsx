import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef} from 'react';
import {Platform, UIManager, findNodeHandle, Image} from 'react-native';
import {Point} from '../../interfaces';
import {MarkerNativeComponent, MarkerNativeRef} from './MarkerNativeComponent';
import {MarkerProps, MarkerRef} from './types';

const getCommand = (cmd: string) => {
  return Platform.OS === 'ios' ? UIManager.getViewManagerConfig('YamapMarker').Commands[cmd] : cmd;
};

export const Marker = forwardRef<MarkerRef, MarkerProps>(({source, ...props}, ref) => {
  const nativeRef = useRef<MarkerNativeRef | null>(null);

  const resolvedSource = useMemo(() => source ? Image.resolveAssetSource(source) : undefined, [source]);

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

  return (
    <MarkerNativeComponent
      {...props}
      ref={nativeRef}
      source={resolvedSource?.uri}
      pointerEvents="none"
    />
  );
});
