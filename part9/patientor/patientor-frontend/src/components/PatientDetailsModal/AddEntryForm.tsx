import { SyntheticEvent, useState } from 'react'
import patientService from '../../services/patients'

interface Props {
    id: string
}
interface SickLeave {
    startDate: string,
    endDate: string
  }

interface newEntry {
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: string[]
}

const AddEntryForm = ({id}: Props) => {
    const [type, setType] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [date, setDate] = useState<string>()
    const [specialist, setSpecialist] = useState<string>()
    const [healthCheckRating, setHealthCheckRating] = useState<number>()
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>()

    const [dischargeDate, setDischargeDate] = useState<string>()
    const [dischargeCriteria, setDischargeCriteria] = useState<string>()

    const [sickLeaveS, setSickLeaveS] = useState<string>()
    const [sickLeaveE, setSickLeaveE] = useState<string>()
    const [employerName, setEmployerName] = useState<string>()

    const submitForm = (event: SyntheticEvent) => {
        event.preventDefault()
        if (!type) return
        if (!(description && date && specialist && id)) return 
        let newEntry:newEntry = {
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes?.split(",")
        }
        switch (type) {
            case 'HealthCheck':
                if(!healthCheckRating) return
                patientService.addEntry(id, {
                    ...newEntry,
                    healthCheckRating: healthCheckRating,
                    type: type
                })
                break;
            case 'Hospital':
                if (!dischargeDate || !dischargeCriteria) return
                patientService.addEntry(id,  {
                    ...newEntry,
                    discharge: {date: dischargeDate, criteria: dischargeCriteria},
                    type: type
                })
                break;
            case 'OccupationalHealthcare':
                interface oh extends newEntry {
                    sickLeave?: SickLeave,
                    employersName? : string
                }
                let newEntry2:oh = {...newEntry}
                if (sickLeaveS && sickLeaveE) {
                    newEntry2 = {
                        ...newEntry,
                        sickLeave: {startDate: sickLeaveS, endDate: sickLeaveE}
                    }
                }
                if (employerName) {
                    newEntry2 = {
                        ...newEntry2,
                        employersName: employerName
                    }
                }
                patientService.addEntry(id, {
                    ...newEntry2,
                    type: type
                })
                break;
        }

        
    }

    return (
        <form onSubmit={submitForm}>
            <h2>New {type} entry</h2>
            <div>
                Type
                use select
                <select onChange={e => setType(e.target.value)}>
                    <option value={'HealthCheck'}>HealthCheck</option>
                    <option value={'Hospital'}>Hospital</option>
                    <option value={'OccupationalHealthcare'}>OccupationalHealthcare</option>
                </select>
            </div>
            <div>
                Description
                <input type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
                Date
                <input type="date" 
                value={date}
                onChange={e => setDate(e.target.value)}/>
            </div>
            <div>
                Specialist
                <input type="text" 
                value={specialist}
                onChange={e => setSpecialist(e.target.value)}/>
            </div>
            {type === 'HealthCheck' &&
                <div>
                    Health check rating
                    <input type="text"
                    value={healthCheckRating}
                    onChange={e => setHealthCheckRating(Number(e.target.value))} />
                </div>
            }
            {type === 'Hospital' && 
                <div>
                    Discharge
                    <div>
                        date
                        <input value={dischargeDate} 
                        onChange={e => setDischargeDate(e.target.value)}
                        type='date' />
                    </div>
                    <div>
                        criteria
                        <input value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} type='text' />
                    </div>
                </div>
            }
            {type === 'OccupationalHealthcare' && 
            <div>
                <div>
                    sick leave
                    <div>
                        start date
                        <input type='date' value={sickLeaveS} onChange={e => setSickLeaveS(e.target.value)} />
                    </div>
                    <div>
                        end date
                        <input type='date' value={sickLeaveE} onChange={e => setSickLeaveE(e.target.value)} />
                    </div>
                </div>
                <div>
                    employer name
                    <input type='text' value={employerName} onChange={e => setEmployerName(e.target.value)} />
                </div>
            </div>
            }
            <div>
                Diagnosis codes
                <input type="text" 
                value={diagnosisCodes}
                onChange={e => setDiagnosisCodes(e.target.value)}/>
            </div>
            <div>
                <button>Cancel</button>
                <button type='submit'>ADD</button>
            </div>
        </form>
    )
}

export default AddEntryForm