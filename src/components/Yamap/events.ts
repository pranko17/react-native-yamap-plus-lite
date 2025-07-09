import {
  CameraPosition,
  NativeSyntheticEventCallback, Point,
  ScreenPoint, VisibleRegion
} from '../../interfaces';
import { CallbacksManager } from '../../utils';

export const onCameraPositionReceived: NativeSyntheticEventCallback<{ id: string } & CameraPosition> = (event) => {
  const { id, ...point } = event.nativeEvent;
  CallbacksManager.call(id, point);
};

export const onVisibleRegionReceived: NativeSyntheticEventCallback<{ id: string } & VisibleRegion> = (event) => {
  const { id, ...visibleRegion } = event.nativeEvent;
  CallbacksManager.call(id, visibleRegion);
};

export const onWorldToScreenPointsReceived: NativeSyntheticEventCallback<{ id: string } & ScreenPoint[]> = (event) => {
  const { id, ...screenPoints } = event.nativeEvent;
  CallbacksManager.call(id, screenPoints);
};

export const onScreenToWorldPointsReceived: NativeSyntheticEventCallback<{ id: string } & Point[]> = (event) => {
  const { id, ...worldPoints } = event.nativeEvent;
  CallbacksManager.call(id, worldPoints);
};
