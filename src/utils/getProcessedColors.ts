import {processColor} from 'react-native';

export const getProcessedColors = <T extends { [key: string]: any }>(props: T, colorProps: Array<keyof T>): T => {
  const _props = {...props};

  colorProps.forEach(name => {
    if (_props[name]) {
      _props[name] = processColor(_props[name]) as T[keyof T];
    }
  });

  return _props;
};
