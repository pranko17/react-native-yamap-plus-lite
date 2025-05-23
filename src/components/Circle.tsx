import React, {FC, useMemo} from 'react';
import {getProcessedColors} from '../utils';
import CircleNativeComponent, {CircleNativeProps} from '../spec/CircleNativeComponent';

export const Circle: FC<CircleNativeProps> = (props) => {
  const processedProps = useMemo(() =>
    getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <CircleNativeComponent {...processedProps} />;
};
