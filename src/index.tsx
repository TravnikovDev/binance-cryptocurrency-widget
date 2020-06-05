import React from 'react';
import { StateInspector } from 'reinspect';
import { StateProvider } from './store.js';
import { BinanceWidgetProps } from './types';

import Layout from './Layout';

const BinanceWidget: React.FunctionComponent<BinanceWidgetProps> = (props) => (
  <StateInspector>
    <StateProvider>
      <Layout {...props} />
    </StateProvider>
  </StateInspector>
);

export default BinanceWidget;
