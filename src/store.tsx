// store.js
import React, { createContext } from 'react';
import { useReducer } from 'reinspect';
import { storeShape, TABS, SORT, Columns, childProps } from './types';

const initialState: storeShape = {
  tab: TABS.BTC,
  sort: SORT.PairASC,
  column: Columns.Change,
  search: '',
  pairs: {},
  pairsOrder: [],
  favorite: [],
  dispatch: function (action: any) {
    return undefined;
  }
};

export const store = createContext(initialState);

export const StateProvider: React.FC = ({ children }: childProps) => {
  const { Provider } = store;
  const [state, dispatch] = useReducer(
    (state: storeShape, action: any) => {
      switch (action.type) {
        case 'UPDATE_SETTINGS': {
          const { payload } = action;
          return { ...state, ...payload };
        }
        case 'UPDATE_PAIRS': {
          const pairsClone = { ...state.pairs };
          const { updates } = action;
          Object.keys(updates).forEach(updatedKey => {
            // because REST API and WebSocket have different format
            // we updating only prices
            const { l, o, h, c, v } = updates[updatedKey];
            if (typeof pairsClone[updatedKey] !== 'undefined') {
              pairsClone[updatedKey].o = parseFloat(o);
              pairsClone[updatedKey].h = parseFloat(h);
              pairsClone[updatedKey].l = parseFloat(l);
              pairsClone[updatedKey].c = parseFloat(c);
              pairsClone[updatedKey].v = parseFloat(v);
            } // else we don't use that cracked WS messages
          })
          // const pairs = { ...state.pairs, ...updates };
          return { ...state, pairs: pairsClone};
        }
        case 'TOGGLE_FAV': {
          const { pairName } = action;
          let clone = [...state.favorite];
          if(clone.includes(pairName)) {
            clone = clone.filter(f => f !== pairName);
          } else {
            clone.push(pairName);
          }
          return { ...state, favorite: clone}
        }
        default:
          throw new Error(`Unhandled action: ${action.type}`);
      }
    },
    initialState,
    (state) => state,
    'Binance'
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
