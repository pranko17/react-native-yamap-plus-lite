import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {DirectEventHandler, Double, Float, Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface PolylineNativeProps extends ViewProps {
  strokeColor?: Int32;
  outlineColor?: Int32;
  strokeWidth?: Float;
  outlineWidth?: Float;
  dashLength?: Float;
  dashOffset?: Float;
  gapLength?: Float;
  onPress?: DirectEventHandler<undefined>;
  points: Point[];
  handled?: boolean;
  zI?: Float;
}

export default codegenNativeComponent<PolylineNativeProps>('YamapPolyline');
