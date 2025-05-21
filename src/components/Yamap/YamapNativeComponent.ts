import {Component} from 'react';
import {NativeMethods, requireNativeComponent} from 'react-native';
import {YamapProps} from './types';
import {OmitEx} from '../../utils';

export type YamapNativeComponentProps = OmitEx<YamapProps, 'userLocationIcon'> & {
  userLocationIcon: string | undefined;
};

export type YamapNativeRef = Component<YamapNativeComponentProps, {}, any> & Readonly<NativeMethods>

export const YamapNativeComponent = requireNativeComponent<YamapNativeComponentProps>('YamapView');
