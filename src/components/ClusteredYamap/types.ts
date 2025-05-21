import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {YamapProps} from '../Yamap';
import {Point} from '../../interfaces';

export interface ClusteredYamapProps<T = any> extends YamapProps {
  clusterColor?: string;
  clusteredMarkers: ReadonlyArray<{point: Point, data: T}>
  renderMarker: (info: {point: Point, data: ListRenderItemInfo<T>}, index: number) => React.ReactElement
}
