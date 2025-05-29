import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {BubblingEventHandler, Double} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface CircleNativeProps extends ViewProps {
  fillColor?: Double;
  strokeColor?: Double;
  strokeWidth?: Double;
  zIndex?: Double;
  onPress?: BubblingEventHandler<undefined>;
  center: Point;
  radius: Double;
  handled?: boolean;
}

export default codegenNativeComponent<CircleNativeProps>('YamapCircle');
