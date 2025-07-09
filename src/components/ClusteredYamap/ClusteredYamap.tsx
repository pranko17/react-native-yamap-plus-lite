import React, {forwardRef, useMemo, useRef} from 'react';
import {getImageUri, getProcessedColors} from '../../utils';
import {
  onCameraPositionReceived,
  onScreenToWorldPointsReceived,
  onVisibleRegionReceived,
  onWorldToScreenPointsReceived,
} from '../Yamap/events';
import {ClusteredYamapProps} from './types';
import {ClusteredYamapNativeComponent, ClusteredYamapNativeRef} from './ClusteredYamapNativeComponent';
import {useYamap} from '../../hooks/useYamap';
import {YamapRef} from '../Yamap';
import { PixelRatio } from 'react-native';

export const ClusteredYamap = forwardRef<YamapRef, ClusteredYamapProps>(({
    showUserPosition = true,
    clusterColor = 'red',
    ...props
  }, ref) => {

  const nativeRef = useRef<ClusteredYamapNativeRef | null>(null);

  useYamap(nativeRef, ref, 'ClusteredYamapView');

  const nativeProps = useMemo(() =>
    getProcessedColors({
      ...props,
      onCameraPositionReceived,
      onVisibleRegionReceived,
      onWorldToScreenPointsReceived,
      onScreenToWorldPointsReceived,
      userLocationIcon: getImageUri(props.userLocationIcon),
      clusterIcon: getImageUri(props.clusterIcon),
      clusterColor,
      clusteredMarkers: props.clusteredMarkers.map(mark => mark.point),
      showUserPosition,
      clusterSize: props.clusterSize ? {
        width:  props.clusterSize.width ? PixelRatio.getPixelSizeForLayoutSize(props.clusterSize.width) : props.clusterSize.width,
        height: props.clusterSize.height ? PixelRatio.getPixelSizeForLayoutSize(props.clusterSize.height) : props.clusterSize.height,
      } : props.clusterSize,
      clusterTextSize: props.clusterTextSize ? PixelRatio.getPixelSizeForLayoutSize(props.clusterTextSize) : props.clusterTextSize,
      clusterTextYOffset: props.clusterTextYOffset ? PixelRatio.getPixelSizeForLayoutSize(props.clusterTextYOffset) : props.clusterTextYOffset,
      clusterTextXOffset: props.clusterTextXOffset ? PixelRatio.getPixelSizeForLayoutSize(props.clusterTextXOffset) : props.clusterTextXOffset,
      children: props.clusteredMarkers.map(props.renderMarker),
    }, ['clusterColor', 'userLocationAccuracyFillColor', 'userLocationAccuracyStrokeColor', 'clusterTextColor']),
    [clusterColor, props, showUserPosition]
  );

  return (
    <ClusteredYamapNativeComponent
      {...nativeProps}
      ref={nativeRef}
    />
  );
});
