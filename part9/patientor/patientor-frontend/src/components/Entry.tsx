import { Entry } from "../types"

interface EntryProps {
    entry: Entry | undefined
}

const assertNever = (value: never | undefined): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const Health = ({ entry }: EntryProps ) => {
    if (entry?.type != "HealthCheck") return <></>

    return (
        <div>
            <p>{entry?.date}</p>
            <p>{entry?.description}</p>
            <p>{entry?.diagnosisCodes}</p>
            <p>{entry?.specialist}</p>
            <p>{entry?.healthCheckRating.toString()}</p>
        </div>
    )
} 

const Hospital = ({entry}: EntryProps) => {
    if (entry?.type != "Hospital") return <></>
    return (
        <div>
            <p>{entry?.date}</p>
            <p>{entry?.description}</p>
            <p>{entry?.discharge.date}</p>
            <p>{entry?.discharge.criteria}</p>
            <p>{entry?.specialist}</p>
        </div>
    )
}

const OccupationalHealthcare = ({entry} : EntryProps) => {
    if (entry?.type != "OccupationalHealthcare") return <></>
    return (
        <div>
            <p>{entry?.date}</p>
            <p>{entry?.description}</p>
            <p>{entry?.specialist}</p>
            <p>{entry?.diagnosisCodes}</p>
            <p>{entry?.employerName}</p>
            <p>{entry?.sickLeave?.startDate}</p>
            <p>{entry?.sickLeave?.endDate}</p>
        </div>
    )
}

const EntryDisplay = ({ entry }: EntryProps) => {

    switch(entry?.type) {
        case "Hospital":
            return <Hospital entry={entry} />
        case "HealthCheck":
            return <Health entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />
        default:
            return assertNever(entry)
    }

    return (
        <div>

        </div>
    )
}

export default EntryDisplay 