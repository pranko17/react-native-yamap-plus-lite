import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {Geocoder, Point} from '../../../'
import {useDebounceFunc} from '../helper/debounce'

export const GeocoderScreen = () => {
  const [text, setText] = useState('Moscow')
  const [point, setPoint] = useState<Point|undefined>()

  const addressToGeo = useDebounceFunc(async (text: string) => {
    try {
      if (text.trim()) {
        setPoint(await Geocoder.addressToGeo(text))
      }
    } catch (e) {
      console.error('addressToGeo', e)
    }
  })

  useEffect( () => {
    setPoint(undefined)
    addressToGeo(text)
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
          value={text}
          onChangeText={setText}
          placeholder={'Address'}
          style={styles.textInput}
      />
      <Text style={styles.text}>{JSON.stringify(point)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginVertical: 16,
  },
  text: {
    color: '#000',
    alignSelf: 'center',
  },
})
