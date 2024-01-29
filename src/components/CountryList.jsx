import styles from './CountryList.module.css';
import CountryItem from './CountryItem'
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

const CountryList = () =>
{

  const { cities, isLoading } = useCities();

  if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  const countries = cities.reduce((acc, cur) =>
  {
    if (!acc.map(el => el.country).includes(cur.country))
      return [...acc, { country: cur.country }];
    else
      return acc;
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <ul className={styles.countryList}>
          {
            countries.map(country => <CountryItem country={country} key={country.country} />)
          }
        </ul>
      )}
    </>
  )
}

export default CountryList