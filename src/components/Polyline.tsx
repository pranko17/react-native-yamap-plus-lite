import React, { FC, useMemo } from 'react';
import { requireNativeComponent } from 'react-native';
import { getProcessedColors } from '../utils';
import { Point } from '../interfaces';

export interface PolylineProps {
  strokeColor?: string;
  outlineColor?: string;
  strokeWidth?: number;
  outlineWidth?: number;
  dashLength?: number;
  dashOffset?: number;
  gapLength?: number;
  zIndex?: number;
  onPress?: () => void;
  points: Point[];
  handled?: boolean;
}

const NativePolylineComponent = requireNativeComponent<PolylineProps>('YamapPolyline');

export const Polyline: FC<PolylineProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['fillColor', 'strokeColor', 'outlineColor']) as PolylineProps,
    [props]
  );

  return <NativePolylineComponent {...processedProps} />;
};
