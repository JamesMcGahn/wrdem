import { ItemFields } from './ContentfulEntries';

export interface ImageProps {
  url: string;
  title: string;
  encoded: string;
}

export interface ContentDataProps {
  fields: ItemFields;
  image: ImageProps;
}
