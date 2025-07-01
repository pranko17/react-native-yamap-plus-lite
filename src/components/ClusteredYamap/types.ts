import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {YamapProps} from '../Yamap';
import {Point, YandexClusterSizes} from '../../interfaces';

export interface ClusteredYamapProps<T = any> extends YamapProps {
  clusterColor?: string;
  clusteredMarkers: ReadonlyArray<{point: Point, data: T}>
  clusterIcon?: ImageSourcePropType;
  clusterSize?: YandexClusterSizes;
  clusterTextSize?: number;
  clusterTextYOffset?: number;
  clusterTextXOffset?: number;
  clusterTextColor?: string;
  renderMarker: (info: {point: Point, data: T}, index: number) => React.ReactElement
}
