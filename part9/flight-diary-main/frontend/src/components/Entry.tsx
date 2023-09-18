import { DiaryEntryDisplay } from "../../../src/types"

const Entry = ({entry}: DiaryEntryDisplay): JSX.Element => {
    return (
        <div>
            <p>{entry.date}</p>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
        </div>
    )
}

export default Entry
