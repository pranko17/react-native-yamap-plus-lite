import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { requireNativeComponent, Platform, type ImageSourcePropType, UIManager, findNodeHandle, Image } from 'react-native';
import type { Point, Anchor } from '../interfaces';
import type { OmitEx } from '../utils/types';

const COMPONENT_NAME = 'YamapMarker';

export interface MarkerProps {
  children?: React.ReactElement;
  zIndex?: number;
  scale?: number;
  rotated?: boolean;
  onPress?: () => void;
  point: Point;
  source?: ImageSourcePropType;
  anchor?: Anchor;
  visible?: boolean;
  handled?: boolean;
}

export interface MarkerRef {
  animatedMoveTo: (coords: Point, duration: number) => void;
  animatedRotateTo: (angle: number, duration: number) => void;
}

type MarkerNativeComponentProps = OmitEx<MarkerProps, 'source'> & {
  source?: string;
  pointerEvents: 'none';
};

const NativeMarkerComponent = requireNativeComponent<MarkerNativeComponentProps>(COMPONENT_NAME);

const getCommand = (cmd: string) => {
  return Platform.OS === 'ios' ? UIManager.getViewManagerConfig(COMPONENT_NAME).Commands[cmd] : cmd;
};

export const Marker = forwardRef<MarkerRef, MarkerProps>(({
                                                            source,
                                                            ...props
                                                          }, ref) => {
  const nativeRef = useRef(null);

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
    <NativeMarkerComponent
      {...props}
      ref={nativeRef}
      source={resolvedSource?.uri}
      pointerEvents="none"
    />
  );
});
