import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';

const CityItem = ({ city }) =>
{
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        }).format(new Date(date));

    const { currentCity, deleteCity } = useCities();

    const { cityName, emoji, date, id, position } = city;

    const deleteCityHandler = (e) =>
    {
        e.preventDefault();
        deleteCity(id);
    }
    return (
        <li>
            <Link
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
                className={`${styles.cityItem} ${currentCity.id === id ? styles.active : ''}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={deleteCityHandler}>&times;</button>
            </Link>
        </li >
    )
}

export default CityItem