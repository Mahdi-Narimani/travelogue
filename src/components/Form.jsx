// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from './Spinner';
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";


export function convertToEmoji(countryCode)
{
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 0x1f1a5 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form()
{
  const [lat, lng] = useUrlPosition();
  const { postCity } = useCities();

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>
  {
    const fetchingCityData = async () =>
    {
      try
      {
        setIsLoading(true);

        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);

        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesn't seem to be a city. Click some where else");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

        setIsLoading(false);
      } catch (error)
      {
        setError(error.message);
      }
    }
    fetchingCityData();
  }, [lat, lng])

  const submitCityData = (e) =>
  {
    e.preventDefault();
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng
      }
    }
    postCity(newCity);
    navigate('/app')
  }

  if (isLoading) return <Spinner />
  if (!lat && !lng) return <Message message='selected city by clicking on map' />
  if (error) return <Message message={error} />


  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={date => setDate(date)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' onClick={submitCityData}>Add</Button>
        <Button type='back' onClick={(e) =>
        {
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
