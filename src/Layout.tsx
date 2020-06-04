import React, { useEffect, useContext } from 'react';
import { store } from './store.js';
import { ALTS, FIAT } from './contstans';
import { BinanceWidgetProps } from './types';
import { star } from './icons';
import styles from './styles.module.css';

const Layout: React.FunctionComponent<BinanceWidgetProps> = ({
  title,
  height,
  width,
  defaultTab,
  defaultSort,
  thirdCol
}) => {
  //   const [activeTab, setActiveTab] = useState(defaultTab || 'BTC');
  //   const [currentSort, setSort] = useState(defaultSort || 'PriceASC');
  //   const [column, setColumn] = useState(thirdCol || 'Change');
  //   const [query, setQuery] = useState('');

  const context = useContext(store);
  console.log(context);
  const { column, dispatch, pairs, search, sort, tab } = context;

  const makeRequest = async () => {
    // Because API have CORS policy which doesn't include localhost
    // I've mocked API sample
    // const response = await fetch('https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products',{
    const response = await fetch('http://localhost:3003/binance');
    
    return await response.json();
  };

  useEffect(() => {
    const data = makeRequest();
    console.info(data);
    dispatch({ type: 'UPDATE_SETTINGS', payload: { pairs: data } });
  }, []);

  const updateValue = (name: string, val: string) =>
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [name]: val } });

  return (
    <main
      style={{
        width: `${width}px` || '150px',
        height: `${height}px` || '300px'
      }}
    >
      <header>{title || 'Market'}</header>
      <hr />
      <nav>
        <button
          className={tab === 'FAV' ? styles.active : ''}
          onClick={() => updateValue('tab', 'FAV')}
        >
          {star}
        </button>
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
        <select className={tab === 'ALTS' ? styles.active : ''}>
          {ALTS.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className={tab === 'FIAT' ? styles.active : ''}>
          {FIAT.map((item: string) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </nav>
      <hr />
      <aside>
        <input
          type='text'
          placeholder='Search'
          className={styles.search}
          value={search}
          onChange={(e) => updateValue('search', e.target.value)}
        />
      </aside>
    </main>
  );
};

export default Layout;
