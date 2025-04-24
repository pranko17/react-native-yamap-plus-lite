import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {ClusteredYamap, Marker} from '../../../';

export const ClusteredMapScreen = () => {
  const clusteredMapRef = useRef<ClusteredYamap>();
  const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
      if (mapLoaded) {
        clusteredMapRef.current?.getCameraPosition(e => {
          console.log('clustered getCameraPosition', e);
        });
        clusteredMapRef.current?.getVisibleRegion(e => {
          console.log('clustered getVisibleRegion', e);
        });
      }
    }, [mapLoaded]);

  return (
    <ClusteredYamap
      ref={clusteredMapRef}
      clusterColor="red"
      initialRegion={{lat: 56.754215, lon: 38.421242, zoom: 6}}
      onMapLoaded={(e) => {
        console.log('clustered onMapLoaded', e.nativeEvent);
        setMapLoaded(true);
      }}
      onCameraPositionChange={e => {
        console.log('clustered onCameraPositionChange', e.nativeEvent);
      }}
      onCameraPositionChangeEnd={e => {
        console.log('clustered onCameraPositionChangeEnd', e.nativeEvent);
      }}
      onMapPress={e => {
        console.log('clustered map onPress', e.nativeEvent);
      }}
      clusteredMarkers={[
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
      ]}
      renderMarker={(info) => (
        <Marker
          key={`${info.point.lat}_${info.point.lon}_${mapLoaded}`}
          point={info.point}
          scale={0.3}
          source={require('../assets/images/marker.png')}
          visible={Platform.OS === 'android' ? mapLoaded : true}
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
