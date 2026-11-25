// The three chapters (basic rules, pronunciation, honorific words) for the cards of the home page.
import { basicRules } from '../data/basics';
import honorifics from '../data/honorifics';
import pronunciation from '../data/pronunciation';
import { CHAPTER_PATHS, hrefOf } from './content';
import { honorificCategoryId } from './references';

export interface ChapterOutline {
  path: string;
  symbol: string;
  title: string;
  korean?: string;
  ownTag?: string;
  description: string;
  /** The chapter's cards, each linking to its place on the chapter page. */
  items: { label: string; href: string }[];
}

export const chapters: ChapterOutline[] = [
  {
    path: CHAPTER_PATHS.basics,
    symbol: '★',
    title: 'Alapszabályok',
    ownTag: '＋ Saját összefoglaló',
    description: 'Szótő és 받침, a -아/어 összevonás, rendhagyó igék, partikulák, jelzői alakok és beszédszintek.',
    items: basicRules.map(({ id, title }) => ({ label: title, href: hrefOf(id)! })),
  },
  {
    path: CHAPTER_PATHS.pronunciation,
    symbol: '♪',
    title: 'Kiejtés',
    korean: '발음',
    description: 'A tankönyvi „발음” dobozok szabálytípus szerint, a leckék példáival.',
    items: pronunciation.categories.map(category => ({
      label: category.hungarian,
      href: hrefOf(`pronunciation-${category.id}`)!,
    })),
  },
  {
    path: CHAPTER_PATHS.honorifics,
    symbol: '◆',
    title: 'Tiszteleti szavak',
    korean: '높임말',
    ownTag: '＋ Saját összeállítás',
    description: 'Tiszteleti és szerény szópárok: partikulák, főnevek, igék, szerény alakok és megszólítás.',
    items: honorifics.categories.map((category, index) => ({
      label: category.hungarian,
      href: hrefOf(honorificCategoryId(index))!,
    })),
  },
];
