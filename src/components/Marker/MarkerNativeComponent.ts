import {Component} from 'react';
import {NativeMethods, requireNativeComponent} from 'react-native';
import {OmitEx} from '../../utils';
import {MarkerProps} from './types';

type MarkerNativeComponentProps = OmitEx<MarkerProps, 'source'> & {
  source?: string;
  pointerEvents: 'none';
};

export type MarkerNativeRef = Component<MarkerNativeComponentProps, {}, any> & Readonly<NativeMethods>

export const MarkerNativeComponent = requireNativeComponent<MarkerNativeComponentProps>('YamapMarker');
