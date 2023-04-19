import Weather from './components/Weather';
import Search from './components/Search';
import useForecast from './hooks/useForecast';

const App = () => {
 const { term, options, forecast, onInputChange, onSubmit, onOptionSelect } =
  useForecast();

 return (
  <main className="flex justify-center items-center bg-gradient-to-br from-yellow-400 via-emerald-400 to-blue-900 h-[100vh] w-full">
   {forecast ? (
    <Weather data={forecast} />
   ) : (
    <Search
     term={term}
     options={options}
     onInputChange={onInputChange}
     onOptionSelect={onOptionSelect}
     onSubmit={onSubmit}
    />
   )}
  </main>
 );
};

export default App;
