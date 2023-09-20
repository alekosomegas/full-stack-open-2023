import { Patient } from '../../types';
import {useMatch} from 'react-router-dom'
import patientService from '../../services/patients'
import { useState, useContext } from 'react';
import { Diagnosis } from '../../types';
import { AffiliateContext } from '../../Wrapper';
import Entry from '../Entry';
import AddEntryForm from './AddEntryForm';

const PatientsDetailsModal = () => {
    const [patient, setPatient] = useState<Patient>()
    const match = useMatch('/patients/:id')

    if (match?.params.id && !patient ) {
        patientService.getPatientById(match.params.id).then(p => setPatient(p))
    } 

    const diagnosisContext = useContext(AffiliateContext);

    return (
        <div>
            <p>{patient?.name}</p>
            <p>{patient?.occupation}</p>
            <p>{patient?.ssn}</p>
            {match?.params.id && 
                <AddEntryForm id={match.params.id}/>
            }
            <h3>Entries</h3>
            {patient?.entries?.map(e => {
                return <Entry entry={e}/>
            })}
        </div>
    )
}

export default PatientsDetailsModal