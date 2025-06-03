import codegenNativeComponent, {NativeComponentType} from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import {DirectEventHandler, Double, Float} from 'react-native/Libraries/Types/CodegenTypes';
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
  scale?: Float;
  rotated?: boolean;
  onPress?: DirectEventHandler<undefined>;
  point: Point;
  anchor?: Anchor;
  visible?: boolean;
  handled?: boolean;
  source?: string;
  zI?: Float;
}

type MarkerComponentType = NativeComponentType<MarkerNativeProps> & Readonly<MarkerNativeCommands>;

export interface MarkerNativeCommands {
  animatedMoveTo: (
    viewRef: React.ElementRef<MarkerComponentType>,
    args: Array<Readonly<{coords: Point, duration: Double}>>
  ) => void;
  animatedRotateTo: (
    viewRef: React.ElementRef<MarkerComponentType>,
    args: Array<Readonly<{angle: Float, duration: Double}>>
  ) => void;
}

export const Commands = codegenNativeCommands<MarkerNativeCommands>({
  supportedCommands: [
    'animatedMoveTo',
    'animatedRotateTo',
  ],
});

export default codegenNativeComponent<MarkerNativeProps>('YamapMarker');
