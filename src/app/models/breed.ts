import { Measure } from './measure';

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  life_span: string;
  alt_names: string;
  wikipedia_url: string;
  origin: string;
  weight: Measure;
  country_code: string;
  height: Measure;
}
