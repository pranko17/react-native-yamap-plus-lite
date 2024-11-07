import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {Address, Point} from '../../../'
import {useDebounceFunc} from '../helper/debounce'
import {Search} from "../../../";

export const SearchScreen = () => {
  const [text, setText] = useState('Moscow')
  const [point, setPoint] = useState<Point | {}>({})
  const [address, setAddress] = useState<Address>()

  const search = useDebounceFunc(async (text: string) => {
    try {
      if (text.trim()) {
        const point1 = await Search.geocodeAddress(text)
        setPoint(point1)

        if (point1.lat) {
          const address1 = await Search.geocodePoint(point1)
          setAddress(address1)
        }
      }
    } catch (e) {
      console.error('search', e)
    }
  })

  useEffect( () => {
    setPoint({})
    search(text)
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
          value={text}
          onChangeText={setText}
          placeholder={'Address'}
          style={styles.textInput}
      />
      <Text style={styles.text}>{`Search.geocodeAddress: ${JSON.stringify(point)}`}</Text>
      <Text style={styles.text}>{`Search.geocodePoint: ${JSON.stringify(address)}`}</Text>
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
    alignSelf: 'flex-start',
    marginTop: 16,
  },
})
