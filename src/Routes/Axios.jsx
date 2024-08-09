import { useState } from 'react';
import axios from 'axios';

const Axios = () => {
  const [pron, setPron] = useState('');

  const getP = () => {
    axios
      .get('https://lust.scathach.id/pornhub/random')
      .then((res) => {
        console.log(res.data.title)
        setPron(res.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={getP}>Dlick Here</button>
      {pron && <p>{pron}</p>}
    </div>
  );
};

export default Axios;
