import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {BubblingEventHandler, Double, Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface PolygonNativeProps extends ViewProps {
  fillColor?: Double;
  strokeColor?: Double;
  strokeWidth?: Double;
  onPress?: BubblingEventHandler<undefined>;
  points: Point[];
  innerRings?: (Point[])[];
  handled?: boolean;
  zI?: Int32;
}

export default codegenNativeComponent<PolygonNativeProps>('YamapPolygon');
