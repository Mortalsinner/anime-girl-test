import { useState } from 'react';
import axios from 'axios';

const Axios = () => {
  const [pron, setPron] = useState('');
  const [error, setError] = useState('');

  const getP = (retryCount = 0) => {
    axios
      .get('https://lust.scathach.id/pornhub/random', { timeout: 5000 })
      .then((res) => {
        console.log(res.data.title);
        setPron(res.data.title);
        setError('');
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED') {
          console.error('Request timed out:', err);
          setError('Request timed out. Please try again.');
        } else if (err.response && err.response.status === 429 && retryCount < 3) {
          // Exponential backoff: 2^retryCount seconds delay
          setTimeout(() => getP(retryCount + 1), Math.pow(2, retryCount) * 1000);
        } else {
          console.error('Error fetching data:', err);
          setError('Failed to fetch data. Please try again later.');
        }
      });
  };

  return (
    <div>
      <button onClick={() => getP()}>Click Here</button>
      {pron && <p>{pron}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Axios;
