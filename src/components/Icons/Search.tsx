import { ChangeEvent, useEffect, useState } from 'react';
import { Option } from '../../types';

type Props = {
  term: string;
  options: Option[];
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: Option) => void;
  onSubmit: () => void;
}

const Search = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-yellow-400 via-emerald-400 to-blue-900 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-lg font-bold text-teal-950">
          Weather Forecast
        </h1>
        <p className="text-sm font-small my-px text-orange-200">
          Powered by OpenWeather
        </p>
        <div className="relative flex mt-10">
          <input
            placeholder="Type name of the place"
            type="text"
            value={term}
            onChange={onInputChange}
            className="placeholder-emerald-500 placeholder-opacity-25 px-2 py-1 rounded-l-md border-2 border-white"
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options?.length > 1 && options.map(
                (option: Option, index: number) => (
                  <li key={`${option.name}-${index}`}>
                    <button
                      className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                      onClick={() => onOptionSelect(option)}
                    >
                      {option.name}
                    </button>
                  </li>
                )
              )}
          </ul>
          <button
          className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
          onClick={onSubmit}>
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;
