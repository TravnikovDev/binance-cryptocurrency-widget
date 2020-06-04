export enum TABS {
  FAV = 'FAV',
  BNB = 'BNB',
  BTC = 'BTC',
  ALTS = 'ALTS',
  FIAT = 'FIAT'
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

export interface storeShape {
  tab: TABS;
  sort: SORT;
  column: Columns;
  search: string;
  pairs: any[];
  dispatch?: any;
}

export type childProps = {
  children: React.ReactNode
};