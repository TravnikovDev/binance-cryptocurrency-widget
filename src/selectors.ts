import memoize from 'fast-memoize';
import filter from 'lodash.filter';
import { PairAssocArray, Pair, TABS, SORT } from './types';

export const filteredPairs = (
  pairs: PairAssocArray,
  tab: TABS,
  search: string
): Pair[] => {
  const filtredArray = filter(pairs, (pair) => {
    const tabСondition = pair.pm === tab;
    const searchCondition = pair.b.includes(search.toUpperCase()) || pair.q.includes(search.toUpperCase());
    return tabСondition && searchCondition;
  });
  return filtredArray;
};

export const filteredPairsSelector = memoize(filteredPairs);

export const sortedPairs = (filteredPairs: Pair[], sort: SORT): Pair[] => {
  return [];
};

export const pairsSelector = memoize(sortedPairs);
