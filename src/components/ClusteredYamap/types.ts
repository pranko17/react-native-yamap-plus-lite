import React from 'react';
import {ImageSourcePropType, ListRenderItemInfo} from 'react-native';
import {Point} from '../../interfaces';
import {OmitEx} from '../../utils';
import {ClusteredYamapNativeProps} from '../../spec/ClusteredYamapNativeComponent';

export type ClusteredYamapProps<T = any> = OmitEx<ClusteredYamapNativeProps, 'clusterColor' | 'userLocationIcon' | 'clusteredMarkers'> & {
  clusterColor?: string;
  userLocationIcon?: ImageSourcePropType;
  clusteredMarkers: ReadonlyArray<{point: Point, data: T}>
  renderMarker: (info: {point: Point, data: ListRenderItemInfo<T>}, index: number) => React.ReactElement
}
