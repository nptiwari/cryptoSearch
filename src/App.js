import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
// import axios from 'axios';

function App() {
  const [crypto, setCrypto] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [ind, setInd] = useState('');
  const [US, setUS] = useState('');

  // function handleSubmit(){
  //   const url = `https://api.coingecko.com/api/v3/coins/${crypto}`
  //   console.log(url);
  //   axios.get(url).then(res=>{
  //     const resData = res.data;
  //     setImgage(resData.image.large)
  //     setName(resData.name)
  //     setSymbol(resData.symbol)
  //     setLink(resData.links.homepage[0])
  //     setInd(resData.market_data.current_price.inr)
  //     setUS(resData.market_data.current_price.usd)
  //   })
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${crypto}`,
    );

    const resData = await response.json();
    const {
      name,
      image,
      symbol,
      links,
      market_data: { current_price },
    } = resData;
    const { large } = image;
    const { inr, usd } = current_price;
    setImage(large);
    setName(name);
    setSymbol(symbol);
    setLink(links.homepage[0]);
    setInd(inr);
    setUS(usd);
  }

  return (
    <div
      style={{ backgroundColor: 'blue', minHeight: '100vh' }}
      className='App'
    >
      <h1 className='bg-info p-4'>Cryptocurrency Search</h1>
      <div className='d-flex justify-content-center'>
        <div className='col-md-4 mt-5'>
          <input
            type='text'
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            placeholder='Enter Crypto Name'
            required
          />
        </div>
      </div>
      <button onClick={handleSubmit} className='btn btn-secondary px-5 mt-4'>
        Submit
      </button>
      <div className='mt-5 container-fluid d-flex justify-content-center'>
        <div className='col-md-6 bg-success p-2 rounded'>
          <img className='mt-5' src={image} alt='currency' width='150' />
          <br />
          <h1 className='text-white'>{name}</h1>
          <h2>{symbol}</h2>
          <h2>
            <a className='text-white' href={link}>
              {link}
            </a>
          </h2>
          <br />
          <h2>Indian value:{ind}</h2>
          <h2>USD value:{US}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
