import React from 'react';
import { StateProvider } from './store.js';
import { BinanceWidgetProps } from './types';

import Layout from './Layout';

const BinanceWidget: React.FunctionComponent<BinanceWidgetProps> = props => (
    <StateProvider>
      <Layout {...props}/>
    </StateProvider>
  );

export default BinanceWidget;
