import Search from './components/Icons/Search';
import useForecast from './hooks/useForecast';

const App = () => {
  const {
    term,
    options,
    city,
    forecast,
    onInputChange,
    onSubmit,
    onOptionSelect
  } = useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-yellow-400 via-emerald-400 to-blue-900 h-[100vh] w-full">
      {forecast ? ('we have forecast') : (
        <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
      )}
    </main>
  );
};

export default App;
