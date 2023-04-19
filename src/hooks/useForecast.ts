import { useEffect, useState, ChangeEvent } from "react";
import { Option, Forecast } from "../types";

const BASE_URL = 'https://api.openweathermap.org'

const useForecast = () => {
  const [term, setTerm] = useState('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<Option | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const getSearchResult = (value: string) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(data => setOptions(data))
      .catch((e) => console.log({ e }));
  };

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.trim();
    setTerm(value);
    if (value !== '') {
        getSearchResult(value)
    }
  };

  const getForecast = (option: Option) => {
    fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&lang=en&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(data => {
        const forecastData = { ...data.city, list: data.list.slice(0,16), } as Forecast;
        setForecast(forecastData);
    })
    .catch((e) => console.log({ e }));
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

  return {
    term,
    options,
    forecast,
    onInputChange,
    onSubmit,
    onOptionSelect
  };
};

export default useForecast;