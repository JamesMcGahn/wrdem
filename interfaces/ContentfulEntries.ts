export interface ContentfulEntries {
  sys: ContentfulEntriesSys;
  total: number;
  skip: number;
  limit: number;
  items: Item[];
  includes: Includes;
}

export interface Includes {
  Asset: Asset[];
}

export interface Asset {
  metadata: Metadata;
  sys: AssetSys;
  fields: AssetFields;
}

export interface AssetFields {
  title: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

export interface Details {
  size: number;
  image: Image;
}

export interface Image {
  width: number;
  height: number;
}

export interface Metadata {
  tags: any[];
}

export interface AssetSys {
  space: AboutMeImage;
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  environment: AboutMeImage;
  revision: number;
  locale: string;
  contentType?: AboutMeImage;
}

export interface AboutMeImage {
  sys: AboutMeImageSys;
}

export interface AboutMeImageSys {
  id: string;
  type: Type;
  linkType: string;
}

export enum Type {
  Link = "Link",
}

export interface Item {
  metadata: Metadata;
  sys: AssetSys;
  fields: ItemFields;
}

export interface ItemFields {
  title: string;
  aboutMeImage: AboutMeImage;
  aboutMeText: string;
  subtitle: string;
  author: string;
  testimonial: string;
  heroimage: AboutMeImage;
  heroText: string;
  displayOrder: number;
  idTag: string;
}

export interface ContentfulEntriesSys {
  type: string;
}
