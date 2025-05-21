import {Point} from '../../interfaces';

export interface PolylineProps {
  strokeColor?: string;
  outlineColor?: string;
  strokeWidth?: number;
  outlineWidth?: number;
  dashLength?: number;
  dashOffset?: number;
  gapLength?: number;
  zIndex?: number;
  onPress?: () => void;
  points: Point[];
  handled?: boolean;
}
