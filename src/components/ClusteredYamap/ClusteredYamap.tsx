import React, {forwardRef, useMemo, useRef} from 'react';
import {getImageUri, getProcessedColors} from '../../utils';
import {
  onCameraPositionReceived,
  onRouteFound,
  onScreenToWorldPointsReceived,
  onVisibleRegionReceived,
  onWorldToScreenPointsReceived,
} from '../Yamap/events';
import {ClusteredYamapProps} from './types';
import ClusteredYamapNativeComponent, {ClusteredYamapNativeRef} from '../../spec/ClusteredYamapNativeComponent';
import {useYamap} from '../../hooks/useYamap';
import {YamapRef} from '../Yamap/types';
import {Commands} from '../../spec/commands/yamap';

export const ClusteredYamap = forwardRef<YamapRef, ClusteredYamapProps>(({
    showUserPosition = true,
    clusterColor = 'red',
    ...props
  }, ref) => {

  const nativeRef = useRef<ClusteredYamapNativeRef | null>(null);

  useYamap(nativeRef, ref, Commands);

  const nativeProps = useMemo(() =>
    getProcessedColors({
      ...props,
      onRouteFound,
      onCameraPositionReceived,
      onVisibleRegionReceived,
      onWorldToScreenPointsReceived,
      onScreenToWorldPointsReceived,
      userLocationIcon: getImageUri(props.userLocationIcon),
      clusterColor,
      clusteredMarkers: props.clusteredMarkers.map(mark => mark.point),
      showUserPosition,
      children: props.clusteredMarkers.map(props.renderMarker),
    }, ['clusterColor', 'userLocationAccuracyFillColor', 'userLocationAccuracyStrokeColor']),
    [clusterColor, props, showUserPosition]
  );

  return (
    <ClusteredYamapNativeComponent
      {...nativeProps}
      ref={nativeRef}
    />
  );
});
