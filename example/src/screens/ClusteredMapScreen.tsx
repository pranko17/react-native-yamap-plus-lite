import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ClusteredYamap, MapLoaded, Marker, NativeSyntheticEventCallback, YamapRef} from '../../../';

export const ClusteredMapScreen = () => {
  const clusteredMapRef = useRef<YamapRef | null>(null);
  const [markers, setMarkers] = useState([]);

  const onMapLoaded: NativeSyntheticEventCallback<MapLoaded> = (event) => {
    console.log('clustered onMapLoaded', event.nativeEvent);

    setMarkers([
      {
        point: {
          lat: 56.754215,
          lon: 38.622504,
        },
        data: {},
      },
      {
        point: {
          lat: 56.754215,
          lon: 38.222504,
        },
        data: {},
      },
    ]);

    clusteredMapRef.current?.getCameraPosition(e => {
      console.log('clustered getCameraPosition', e);
    });
    clusteredMapRef.current?.getVisibleRegion(e => {
      console.log('clustered getVisibleRegion', e);
    });
    clusteredMapRef.current?.getWorldPoints([{x: 100, y: 100}], e => {
      console.log('clustered getWorldPoints', e);
    });
    clusteredMapRef.current?.getScreenPoints([{lat: 55.75124399961543, lon: 37.618422999999986}], e => {
      console.log('clustered getScreenPoints', e);
    });
    // clusteredMapRef.current?.findRoutes([{lat: 55.75, lon: 37.61}, {lat: 55.76, lon: 37.62}], ['walk'], e => {
    //   console.log('clustered findRoutes', e);
    // });
  };

  return (
    <ClusteredYamap
      ref={clusteredMapRef}
      clusterColor="red"
      clusterIcon={require('../assets/images/octagon.png')}
      clusterSize={{width: 35, height: 35}}
      clusterTextColor={'red'}
      initialRegion={{lat: 56.754215, lon: 38.421242, zoom: 6}}
      onMapLoaded={onMapLoaded}
      onCameraPositionChange={e => {
        console.log('clustered onCameraPositionChange', e.nativeEvent);
      }}
      onCameraPositionChangeEnd={e => {
        console.log('clustered onCameraPositionChangeEnd', e.nativeEvent);
      }}
      onMapPress={e => {
        console.log('clustered map onPress', e.nativeEvent);
      }}
      onMapLongPress={(e) => {
        console.log('clustered map onLongPress', e.nativeEvent);
      }}
      clusteredMarkers={markers}
      renderMarker={(info) => (
        <Marker
          key={`${info.point.lat}_${info.point.lon}`}
          point={info.point}
          scale={0.3}
          source={require('../assets/images/marker.png')}
          anchor={{x: 0.5, y: 1}}
        />
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
