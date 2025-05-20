import {Image, ImageSourcePropType} from 'react-native';

export const getImageUri = (source: ImageSourcePropType | undefined) =>
  source ? Image.resolveAssetSource(source).uri : undefined;
