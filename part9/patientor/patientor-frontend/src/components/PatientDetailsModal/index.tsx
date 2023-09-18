import { Patient } from '../../types';
import {useMatch} from 'react-router-dom'
import patientService from '../../services/patients'
import { useState } from 'react';

const PatientsDetailsModal = () => {
    const [patient, setPatient] = useState<Patient>()
    const match = useMatch('/patients/:id')

    if (match?.params.id && !patient ) {
        patientService.getPatientById(match.params.id).then(p => setPatient(p))
    } 
    
    return (
        <div>
            <p>{patient?.name}</p>
            <p>{patient?.occupation}</p>
            <p>{patient?.ssn}</p>
            <h3>Entries</h3>
            <p>{patient?.entries?.map(e => {
                return (
                    <div>
                        <p>{e.date} {e.description}</p>
                        <ul>
                        {e.diagnosisCodes?.map(d => 
                            <li key={d}>{d}</li>
                            )}
                        </ul>
                    </div>
                )
            })}</p>
        </div>
    )
}

export default PatientsDetailsModal