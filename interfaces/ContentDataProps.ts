export interface NavBios {
  href: string;
  display: string;
}

export interface ImageProps {
  url: string;
  title: string;
  encoded: string;
}

export interface Testimonials {
  fields: TestimonialFields;
  image: ImageProps;
}

interface TestimonialFields {
  author: string;
  testimonial: string;
}

export interface AboutMeSection {
  fields: AboutMeSectionFields;
  image: ImageProps;
}
export interface BioPage {
  fields: BioPageFields;
  image: ImageProps;
}

interface BioPageFields {
  title: string;
  biotext: string;
  slug: string;
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
