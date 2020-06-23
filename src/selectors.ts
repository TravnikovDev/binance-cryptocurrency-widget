import memoize from 'fast-memoize';
import filter from 'lodash.filter';
import { PairAssocArray, Pair, TABS, SORT } from './types';
import { pairChange } from './utils';

export const filteredPairs = (
  pairs: PairAssocArray,
  tab: TABS,
  search: string,
  favorite: string[]
): Pair[] => {
  const filtredArray = filter(pairs, (pair: Pair): boolean => {
    const tabСondition = tab === 'FAV'? favorite.includes(pair.s) : pair.pm === tab;
    const searchCondition =
      pair.b.includes(search.toUpperCase()) ||
      pair.q.includes(search.toUpperCase());
    return tabСondition && searchCondition;
  });
  return filtredArray;
};

export const filteredPairsSelector = memoize(filteredPairs);

export const sortedPairs = (filteredPairs: Pair[], sort: SORT): Pair[] => {
  const clone = [...filteredPairs];
  switch (sort) {
    case 'PairASC': {
      clone.sort((a, b) => (a.s.toUpperCase() > b.s.toUpperCase() ? 1 : -1));
      break;
    }
    case 'PairDSC': {
      clone.sort((a, b) => (a.s.toUpperCase() < b.s.toUpperCase() ? 1 : -1));
      break;
    }
    case 'PriceASC': {
      clone.sort((a, b) => (a.c > b.c ? 1 : -1));
      break;
    }
    case 'PriceDSC': {
      clone.sort((a, b) => (a.c < b.c ? 1 : -1));
      break;
    }
    case 'ChangeASC': {
      clone.sort((a,b) => (pairChange(a) > pairChange(b) ? 1 : -1));
      break;
    }
    case 'ChangeDSC': {
      clone.sort((a,b) => (pairChange(a) < pairChange(b) ? 1 : -1));
      break;
    }
    case 'VolumeASC': {
      clone.sort((a, b) => (a.v > b.v ? 1 : -1));
      break;
    }
    case 'VolumeDSC': {
      clone.sort((a, b) => (a.v < b.v ? 1 : -1));
      break;
    }
    default:
      // clone.sort((a, b) => (a.s.toUpperCase() > b.s.toUpperCase() ? 1 : -1));
      break;
  }
  return clone;
};

export const pairsSelector = memoize(sortedPairs);
