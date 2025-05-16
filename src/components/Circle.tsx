import React, { FC, useMemo } from 'react';
import { requireNativeComponent } from 'react-native';
import { getProcessedColors } from '../utils';
import { Point } from '../interfaces';

export interface CircleProps {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  zIndex?: number;
  onPress?: () => void;
  center: Point;
  radius: number;
  handled?: boolean;
}

const NativeCircleComponent = requireNativeComponent<CircleProps>('YamapCircle');

export const Circle: FC<CircleProps> = (props) => {
  const processedProps = useMemo(() =>
    getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <NativeCircleComponent {...processedProps} />;
};
