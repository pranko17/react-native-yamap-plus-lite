import {Component} from 'react';
import {NativeMethods, requireNativeComponent} from 'react-native';
import {ClusteredYamapProps} from './types';
import {OmitEx} from '../../utils';
import {Point} from '../../interfaces';

type ClusteredYamapNativeComponentProps = OmitEx<ClusteredYamapProps, 'userLocationIcon' | 'clusteredMarkers'> & {
  userLocationIcon: string | undefined;
  clusteredMarkers: Point[];
};

export type ClusteredYamapNativeRef = Component<ClusteredYamapNativeComponentProps, {}, any> & Readonly<NativeMethods>

export const ClusteredYamapNativeComponent =
  requireNativeComponent<ClusteredYamapNativeComponentProps>('ClusteredYamapView');
