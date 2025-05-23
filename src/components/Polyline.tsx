import React, {FC, useMemo} from 'react';
import {getProcessedColors} from '../utils';
import PolylineNativeComponent, {PolylineNativeProps} from '../spec/PolylineNativeComponent';

export const Polyline: FC<PolylineNativeProps> = (props) => {
  const processedProps = useMemo(() =>
      getProcessedColors(props, ['strokeColor', 'outlineColor']),
    [props]
  );

  return <PolylineNativeComponent {...processedProps} />;
};
