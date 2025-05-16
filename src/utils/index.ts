import { processColor } from 'react-native';

export function processColorProps<T>(props: T, name: keyof T) {
  if (props[name]) {

    // @ts-ignore
    props[name] = processColor(props[name]);

  }
}

export const getProcessedColors = <T extends { [key: string]: any }>(props: T, colorProps: Array<keyof T>): T => {
  const _props = {...props};

  colorProps.forEach(name => {
    if (_props[name]) {
      _props[name] = processColor(_props[name]) as T[keyof T];
    }
  });

  return _props;
};

export const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};
