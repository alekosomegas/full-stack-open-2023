import { useState, SyntheticEvent } from "react";
import { Weather, Visibility, NewDiaryEntry } from "../../types";


interface Props {
    onSubmit: (values: NewDiaryEntry) => void;
  }

const EntryForm = ({onSubmit}: Props): JSX.Element => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState('')
    
    const submitForm = (event : SyntheticEvent) => {
        event.preventDefault()
        onSubmit({
            date,
            visibility, 
            weather, 
            comment
        })
    }
    
    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    date
                    <input type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    visibility
                    great <input type="radio" name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(Visibility.Great)} />
                    good <input type="radio" name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(Visibility.Good)} />
                    ok <input type="radio" name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(Visibility.Ok)} />
                    poor <input type="radio" name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(Visibility.Poor)} />
                </div>
                <div>
                    weather
                    Sunny <input type="radio" name="weather" 
                    value={weather}
                    onChange={(e) => setWeather(Weather.Sunny)} />
                    cloudy <input type="radio" name="weather" 
                    value={weather}
                    onChange={(e) => setWeather(Weather.Cloudy)} />
                    rainy <input type="radio" name="weather" 
                    value={weather}
                    onChange={(e) => setWeather(Weather.Rainy)} />
                    stormy <input type="radio" name="weather" 
                    value={weather}
                    onChange={(e) => setWeather(Weather.Stormy)} />
                    windy <input type="radio" name="weather" 
                    value={weather}
                    onChange={(e) => setWeather(Weather.Windy)} />
                </div>
                <div>
                    comment
                    <input type="text" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default EntryForm