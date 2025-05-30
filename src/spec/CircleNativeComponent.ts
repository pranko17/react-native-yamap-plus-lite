import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  DirectEventHandler,
  Double,
  Float,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface CircleNativeProps extends ViewProps {
  fillColor?: Int32;
  strokeColor?: Int32;
  strokeWidth?: Float;
  onPress?: DirectEventHandler<undefined>;
  center: Point;
  radius: Float;
  handled?: boolean;
  zI?: Int32;
}

export default codegenNativeComponent<CircleNativeProps>('YamapCircle');
