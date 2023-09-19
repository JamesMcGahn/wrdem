export interface ImageProps {
  url: string;
  title: string;
  encoded: string;
}

export interface AboutMeSection {
  fields: AboutMeSectionFields;
  image: ImageProps;
}

interface AboutMeSectionFields {
  title: string;
  aboutMeText: string;
  subtitle: string;
  displayOrder: number;
  idTag: string;
}

interface HeroImageSectionFields {
  title: string;
  subtitle: string;
  heroText: string;
}

export interface HomeHero {
  fields: HeroImageSectionFields;
  image: ImageProps;
}

export interface AccomplishSummarySection {
  accomplishlist: string;
}

export interface VoteCall2ActionSection {
  electorReelect: string;
  candidates: string;
  electiondateday: string;
}
