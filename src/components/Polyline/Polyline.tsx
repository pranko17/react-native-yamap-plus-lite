import React, {FC, useMemo} from 'react';
import {getProcessedColors} from '../../utils';
import {PolylineNativeComponent} from './PolylineNativeComponent';
import {PolylineProps} from './types';

export const Polyline: FC<PolylineProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['strokeColor', 'outlineColor']),
    [props]
  );

  return <PolylineNativeComponent {...processedProps} />;
};
