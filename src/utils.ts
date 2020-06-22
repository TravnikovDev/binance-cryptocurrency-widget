export const keyBy = (array, key) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

export const getBinanceData = async (dispatch) => {
  // Because API have CORS policy which doesn't include localhost
  // I've mocked API sample
  // const data = await getData('https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products',{
  const data = await jsonFetch('http://localhost:3003/binance');
  console.info(data);
  const pairs = keyBy(data, 's');
  const pairsOrder = data.map((item) => item.s);
  dispatch({ type: 'UPDATE_SETTINGS', payload: { pairs, pairsOrder } });
};

async function jsonFetch(request: RequestInfo): Promise<any> {
    try {
        const response = await fetch(request);
        const body = await response.json();
        return body;
    } catch(e) {
        console.error(e)
    }
}

export const connectWebSocket = (dispatch, url) => {
  const ws = new WebSocket(url);

  ws.onmessage = (evt: MessageEvent) => {
    const { data } = JSON.parse(evt.data);
    console.info(data);
    const updates = keyBy(data, 's');
    dispatch({ type: 'UPDATE_PAIRS', updates });
  };
};
