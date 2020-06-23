export enum TABS {
  FAV = 'FAV',
  BNB = 'BNB',
  BTC = 'BTC',
  ALTS = 'ALTS',
  FIAT = 'USDⓈ'
}

export enum SORT {
  PairASC = 'PairASC',
  PairDSC = 'PairDSC',
  PriceASC = 'PriceASC',
  PriceDSC = 'PriceDSC',
  ChangeASC = 'ChangeASC',
  ChangeDSC = 'ChangeDSC',
  VolumeASC = 'VolumeASC',
  VolumeDSC = 'VolumeDSC'
}

export enum Columns {
  Change = 'Change',
  Volume = 'Volume'
}

export interface BinanceWidgetProps {
  title?: string;
  width?: number;
  height?: number;
  defaultTab?: TABS;
  defaultSort?: SORT;
  thirdCol?: Columns;
}
/**
 * Pair interface
 * represent a crypto pairs from Binance API, description of parameters: 
 * * s - Pair name = base + quote asset. Used as key 
 * * b - base asset
 * * q - quote asset
 * * qa - symbol
 * * ts - timestamp
 * * an - base asset whole name
 * * qn - quote asset whole name
 * * o -open price
 * * h -high price
 * * l -low price
 * * c -latest price
 * * pm - parent market
 * * pn - category of the parent market
 * @export
 * @interface Pair
 */
export interface Pair {
  s: string, // Pair name = base + quote asset. Used as key 
  st: string,
  b: string, // base asset
  q: string, // quote asset
  ba: string,
  qa: string, // symbol
  i: number,
  ts: number, // timestamp
  an: string, // base asset whole name
  qn: string, // quote asset whole name
  o: number, // open price
  h: number, // high price
  l: number, // low price
  c: number, // latest price
  v: number,
  qv: number,
  y: number,
  as: number,
  pm: string, // parent market
  pn: string, // category of the parent market
  cs: number,
  etf: boolean
}

export interface PairAssocArray {
  [s: string]: Pair
}

export interface storeShape {
  tab: TABS;
  sort: SORT;
  column: Columns;
  search: string;
  pairs: PairAssocArray;
  pairsOrder: string[];
  favorite: string[];
  dispatch?: any;
}

export type childProps = {
  children: React.ReactNode
};