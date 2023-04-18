import { ChangeEvent, useEffect, useState } from 'react';
import { Option } from './types';
import Search from './components/Icons/Search';

const App = () => {
  const [term, setTerm] = useState('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<Option | null>(null);

  const getSearchResult = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(data => setOptions(data));
  };

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.trim();
    setTerm(value);
    if (term === '') return;

    getSearchResult(value);
  };

  const getForecast = (option: Option) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(data => console.log(data));
  }

  const onSubmit = () => {
    if(!city) return;
    getForecast(city);
  };

  const onOptionSelect = (option: Option) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    };
  }, [city]);


  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-yellow-400 via-emerald-400 to-blue-900 h-[100vh] w-full">
      <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
    </main>
  );
};

export default App;
