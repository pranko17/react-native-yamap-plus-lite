import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {BubblingEventHandler, Double, Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface PolylineNativeProps extends ViewProps {
  strokeColor?: Int32;
  outlineColor?: Int32;
  strokeWidth?: Double;
  outlineWidth?: Double;
  dashLength?: Double;
  dashOffset?: Double;
  gapLength?: Double;
  onPress?: BubblingEventHandler<undefined>;
  points: Point[];
  handled?: boolean;
  zI?: Int32;
}

export default codegenNativeComponent<PolylineNativeProps>('YamapPolyline');
