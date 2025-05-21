import React, {FC, useMemo} from 'react';
import {getProcessedColors} from '../../utils';
import {CircleNativeComponent} from './CircleNativeComponent';
import {CircleProps} from './types';

export const Circle: FC<CircleProps> = (props) => {
  const processedProps = useMemo(() =>
    getProcessedColors(props, ['fillColor', 'strokeColor']),
    [props]
  );

  return <CircleNativeComponent {...processedProps} />;
};
