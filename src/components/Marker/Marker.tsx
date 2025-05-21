import React, {forwardRef, useMemo} from 'react';
import {MarkerNativeComponent} from './MarkerNativeComponent';
import {MarkerProps, MarkerRef} from './types';
import {useMarker} from '../../hooks/useMarker';
import {getImageUri} from '../../utils';

export const Marker = forwardRef<MarkerRef, MarkerProps>(({source, ...props}, ref) => {
  const {nativeRef} = useMarker(ref);

  const imageUri = useMemo(() => getImageUri(source), [source]);

  return (
    <MarkerNativeComponent
      {...props}
      ref={nativeRef}
      source={imageUri}
      pointerEvents="none"
    />
  );
});
