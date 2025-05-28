import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {TurboModule, TurboModuleRegistry} from 'react-native';

export type YamapSuggest = {
  title: string;
  subtitle?: string;
  uri?: string;
}

enum SuggestTypes {
  YMKSuggestTypeUnspecified,
  YMKSuggestTypeGeo,
  YMKSuggestTypeBiz,
  YMKSuggestTypeTransit,
}

interface Point {
  lat: Double;
  lon: Double;
}

interface BoundingBox {
  southWest: Point;
  northEast: Point;
}

export interface SuggestOptions {
  userPosition?: Point;
  boundingBox?: BoundingBox;
  suggestWords?: boolean;
  suggestTypes?: SuggestTypes[];
}

interface Spec extends TurboModule {
  suggest(query: string): Promise<Array<YamapSuggest>>
  suggestWithOptions(query: string, options: SuggestOptions): Promise<Array<YamapSuggest>>
  reset(): Promise<void>
}

export default TurboModuleRegistry.getEnforcing<Spec>('YamapSuggests');
