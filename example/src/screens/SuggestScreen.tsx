import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {Address, Suggest, YamapSuggest} from '../../../'
import {useDebounceFunc} from '../helper/debounce'

export const SuggestScreen = () => {
  const [text, setText] = useState('Moscow')
  const [suggests, setSuggests] = useState<YamapSuggest[]>()

  const search = useDebounceFunc(async (text: string) => {
    try {
      if (text.trim()) {
        const suggests = await Suggest.suggest(text)
        setSuggests(suggests)
      }
    } catch (e) {
      console.error('suggest', e)
    }
  })

  useEffect( () => {
    setSuggests(undefined)
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
      <Text style={styles.text}>{`Suggest.suggest: ${JSON.stringify(suggests)}`}</Text>
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
