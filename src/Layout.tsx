import React, { useEffect, useContext } from 'react';
import { FixedSizeList as List } from 'react-window';
import { store } from './store.js';
// import { ALTS, FIAT } from './contstans';
import { filteredPairsSelector } from './selectors';
import { BinanceWidgetProps } from './types';
import { keyBy } from './utils';
import { star } from './icons';
import styles from './styles.module.css';

const Layout: React.FC<BinanceWidgetProps> = ({
  title,
  height,
  width,
  defaultTab,
  defaultSort,
  thirdCol
}) => {
  const context = useContext(store);
  console.log(context);
  const { column, dispatch, pairs, pairsOrder, search, sort, tab } = context;

  const filteredPairs = filteredPairsSelector(pairs, tab, search);
  // console.info(filteredPairs);

  const makeRequest = async () => {
    // Because API have CORS policy which doesn't include localhost
    // I've mocked API sample
    // const data = await getData('https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products',{
    const data = await getData('http://localhost:3003/binance');
    console.info(data);
    const pairs = keyBy(data, 's');
    const pairsOrder = data.map((item) => item.s);
    dispatch({ type: 'UPDATE_SETTINGS', payload: { pairs, pairsOrder } });
  };

  async function getData(request: RequestInfo): Promise<any> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  }

  const connectWebSocket = () => {
    const ws = new WebSocket(
      'wss://stream.binance.com/stream?streams=!miniTicker@arr'
    );

    ws.onmessage = (evt: MessageEvent) => {
      const { data } = JSON.parse(evt.data);
      console.info(data);
      const updates = keyBy(data, 's');
      dispatch({ type: 'UPDATE_PAIRS', updates });
    };
  };

  useEffect(() => {
    makeRequest();
    // connectWebSocket();
  }, []);

  const updateValue = (name: string, val: string) =>
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [name]: val } });

  const Row = ({ index, style }) => {
    // const name = Object.keys(filteredPairs)[index];
    const { b, q, s, c, o } = filteredPairs[index];

    return (
      <li style={style}>
        <div>{`${b}/${q}`}</div>
        <div>{c}</div>
        <div>{`${(((o - c) / o) * 100).toFixed(2)}%`}</div>
      </li>
    );
  };

  return (
    <main
      style={{
        width: width ? `${width}px` : '313px',
        height: height ? `${height}px` : '382px'
      }}
    >
      <header>{title || 'Market'}</header>
      <nav>
        <button
          className={tab === 'FAV' ? styles.active : ''}
          onClick={() => updateValue('tab', 'FAV')}
        >
          {star}
        </button>
        <button>Margin</button>
        <button
          className={tab === 'BNB' ? styles.active : ''}
          onClick={() => updateValue('tab', 'BNB')}
        >
          BNB
        </button>
        <button
          className={tab === 'BTC' ? styles.active : ''}
          onClick={() => updateValue('tab', 'BTC')}
        >
          BTC
        </button>
        {/* <select className={tab === 'ALTS' ? styles.active : ''}>
          {ALTS.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select> */}
        <button
          className={tab === 'ALTS' ? styles.active : ''}
          onClick={() => updateValue('tab', 'ALTS')}
        >
          ALTS
        </button>
        {/* <select className={tab === 'USDⓈ' ? styles.active : ''}>
          {FIAT.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select> */}
        <button
          className={tab === 'USDⓈ' ? styles.active : ''}
          onClick={() => updateValue('tab', 'USDⓈ')}
        >
          USDⓈ
        </button>
      </nav>
      <aside>
        <input
          type='text'
          placeholder='Search'
          className={styles.search}
          value={search}
          onChange={(e) => updateValue('search', e.target.value)}
        />
        <input
          type='radio'
          name='thirdCol'
          id='change'
          value='change'
          checked
        />
        <label htmlFor='change'>Change</label>
        <input type='radio' name='thirdCol' id='volume' value='volume' />
        <label htmlFor='volume'>Volume</label>
      </aside>
      <section>
        <header>
          <a href='#'>Pair:</a>
          <a href='#'>Last price:</a>
          <a href='#'>Change:</a>
        </header>
        <List
          className='List'
          height={200}
          // itemCount={pairsOrder.length}
          itemCount={filteredPairs.length}
          itemSize={35}
          width={width ? `${width}px` : '313px'}
          innerElementType='ul'
        >
          {Row}
        </List>
      </section>
    </main>
  );
};

export default Layout;
