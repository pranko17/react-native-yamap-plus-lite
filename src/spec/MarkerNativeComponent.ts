import codegenNativeComponent, {NativeComponentType} from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import {DirectEventHandler, Double, Float, Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {ViewProps} from 'react-native';

interface Point {
  lat: Double;
  lon: Double;
}

type Anchor = {
  x: Double;
  y: Double;
}

export interface MarkerNativeProps extends ViewProps {
  scale?: Double;
  rotated?: boolean;
  onPress?: DirectEventHandler<undefined>;
  point: Point;
  anchor?: Anchor;
  visible?: boolean;
  handled?: boolean;
  source?: string;
  zI?: Int32;
}

type MarkerComponentType = NativeComponentType<MarkerNativeProps> & Readonly<MarkerNativeCommands>;

export interface MarkerNativeCommands {
  animatedMoveTo: (
    viewRef: React.ElementRef<MarkerComponentType>,
    args: Array<Readonly<{coords: Point, duration: Float}>>
  ) => void;
  animatedRotateTo: (
    viewRef: React.ElementRef<MarkerComponentType>,
    args: Array<Readonly<{angle: Float, duration: Float}>>
  ) => void;
}

export const Commands = codegenNativeCommands<MarkerNativeCommands>({
  supportedCommands: [
    'animatedMoveTo',
    'animatedRotateTo',
  ],
});

export default codegenNativeComponent<MarkerNativeProps>('YamapMarker');
