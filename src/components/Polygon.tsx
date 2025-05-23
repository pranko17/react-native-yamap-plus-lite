import React, { FC, useMemo } from 'react';
import {getProcessedColors} from '../utils';
import PolygonNativeComponent, {PolygonNativeProps} from '../spec/PolygonNativeComponent';

export const Polygon: FC<PolygonNativeProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <PolygonNativeComponent {...processedProps} />;
};
