import patientsData from '../../data/patients'
import { NonSensitivePatientData, Patient, NewPatientEntry } from '../../types'
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
    return patientsData
}

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation  
    }))
}

const addPatient = (entry: NewPatientEntry): Patient => {
    console.log(entry);
    
    const newPatient: Patient = {
        id: uuid(),
        ...entry
    } 

    patientsData.push(newPatient)
    return newPatient

}

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient
}