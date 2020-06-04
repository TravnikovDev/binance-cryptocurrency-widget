// store.js
import React, { createContext, useReducer } from 'react';
import { storeShape, TABS, SORT, Columns, childProps } from './types';

const initialState = {
  tab: TABS.BTC,
  sort: SORT.PairASC,
  column: Columns.Change,
  search: '',
  pairs: []
};

export const store = createContext<storeShape>(initialState);

export const StateProvider: React.FC = ({ children }: childProps) => {
  const { Provider } = store;
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'action description':
        // const newState = // do something with the action
        return { ...state, pairs: ['poopa', 'loopa'] };
      case 'UPDATE_SETTINGS':
        const { payload } = action;
        return { ...state, ...payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
