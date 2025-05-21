import React, { FC, useMemo } from 'react';
import {getProcessedColors} from '../../utils';
import {PolygonNativeComponent} from './PolygonNativeComponent';
import {PolygonProps} from './types';

export const Polygon: FC<PolygonProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <PolygonNativeComponent {...processedProps} />;
};
