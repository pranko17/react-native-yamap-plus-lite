import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {BubblingEventHandler, Double} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

export interface PolygonNativeProps extends ViewProps {
  fillColor?: Double;
  strokeColor?: Double;
  strokeWidth?: Double;
  zIndex?: Double;
  onPress?: BubblingEventHandler<undefined>;
  points: Point[];
  innerRings?: (Point[])[];
  handled?: boolean;
}

export default codegenNativeComponent<PolygonNativeProps>('YamapPolygon');
