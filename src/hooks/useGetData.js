import { useState, useEffect } from 'react';
import { mainItems } from 'src/mock/items';

export default function useGetData(_id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const result = mainItems.filter((item) => item.id === _id)[0];
    setData(result);
  }, [_id]);

  return data;
}
