// store.js
import React, { createContext } from 'react';
import { useReducer } from 'reinspect';
import { storeShape, TABS, SORT, Columns, childProps } from './types';

const initialState = {
  tab: TABS.BTC,
  sort: SORT.PairASC,
  column: Columns.Change,
  search: '',
  pairs: {},
  pairsOrder: [],
  dispatch: function (action: any) {
    // Events not supported.
    return undefined;
  }
};

export const store = createContext(initialState);

export const StateProvider: React.FC = ({ children }: childProps) => {
  const { Provider } = store;
  const [state, dispatch] = useReducer(
    (state: storeShape, action: any) => {
      switch (action.type) {
        case 'UPDATE_SETTINGS':
          const { payload } = action;
          return { ...state, ...payload };
        case 'UPDATE_PAIRS':
          const { updates } = action;
          const pairs = { ...state.pairs, ...updates };
          return { ...state, pairs };
        default:
          throw new Error();
      }
    },
    initialState,
    (state) => state,
    'Binance'
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
