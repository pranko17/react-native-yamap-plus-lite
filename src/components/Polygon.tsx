import React, { FC, useMemo } from 'react';
import { requireNativeComponent } from 'react-native';
import { getProcessedColors } from '../utils';
import { Point } from '../interfaces';

export interface PolygonProps {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  zIndex?: number;
  onPress?: () => void;
  points: Point[];
  innerRings?: (Point[])[];
  handled?: boolean;
}

const NativePolygonComponent = requireNativeComponent<PolygonProps>('YamapPolygon');

export const Polygon: FC<PolygonProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <NativePolygonComponent {...processedProps} />;
};
