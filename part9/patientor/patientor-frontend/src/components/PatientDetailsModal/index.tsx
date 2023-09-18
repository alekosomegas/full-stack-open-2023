import { Patient } from '../../types';
import {useMatch} from 'react-router-dom'
import patientService from '../../services/patients'
import { useState, useContext } from 'react';
import { Diagnosis } from '../../types';
import { AffiliateContext } from '../../Wrapper';
import Entry from '../Entry';

const PatientsDetailsModal = () => {
    const [patient, setPatient] = useState<Patient>()
    const match = useMatch('/patients/:id')

    if (match?.params.id && !patient ) {
        patientService.getPatientById(match.params.id).then(p => setPatient(p))
    } 

    const diagnosisContext = useContext(AffiliateContext);

    const getCode = (c: string) => {
        if (diagnosisContext?.data) {
            const code:Diagnosis | undefined = diagnosisContext.data.find(d => d.code === c)
            return code;
        }
    }

    return (
        <div>
            <p>{patient?.name}</p>
            <p>{patient?.occupation}</p>
            <p>{patient?.ssn}</p>
            <h3>Entries</h3>
            <p>{patient?.entries?.map(e => {
                return <Entry entry={e}/>
                return (
                    <div>
                        <p>{e.date} {e.description}</p>
                        <ul>
                        {e.diagnosisCodes?.map(d => { 
                            const code = getCode(d)
                            return <li key={d}>{d} {code?.name}</li>
                        }
                            )}
                        </ul>
                    </div>
                )
            })}</p>
        </div>
    )
}

export default PatientsDetailsModal