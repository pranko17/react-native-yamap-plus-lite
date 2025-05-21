import {requireNativeComponent} from 'react-native';
import {PolygonProps} from './types';

export const PolygonNativeComponent = requireNativeComponent<PolygonProps>('YamapPolygon');
