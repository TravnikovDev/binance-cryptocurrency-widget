import React, { useEffect, useContext } from 'react';
import { FixedSizeList as List } from 'react-window';
import { store } from './store.js';
// import { ALTS, FIAT } from './contstans';
import { filteredPairsSelector, pairsSelector } from './selectors';
import { BinanceWidgetProps } from './types';
import { getBinanceData, connectWebSocket } from './utils';
import { binanceWs } from './contstans';
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
  // console.log(context);
  const { column, dispatch, pairs, search, sort, tab } = context;
  const filteredPairs = filteredPairsSelector(pairs, tab, search);
  const sortedPairs = pairsSelector(filteredPairs, sort);
  console.info(filteredPairs);

  useEffect(() => {
    getBinanceData(dispatch);
    connectWebSocket(dispatch, binanceWs);
  }, []);

  const updateValue = (name: string, val: string) =>
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [name]: val } });

  const Row = ({ index, style }) => {
    // const name = Object.keys(filteredPairs)[index];
    const { b, q, s, c, o } = sortedPairs[index];

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
          itemCount={sortedPairs.length}
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
