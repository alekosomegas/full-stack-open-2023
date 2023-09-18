import patientsData from '../../data/patients'
import { NonSensitivePatientData, Patient, NewPatientEntry } from '../../types'
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
    return patientsData
}

const getPatientById = (id: string) => {
    return patientsData.find(p => p.id === id)
}

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation, entries }) => ({
      id, name, dateOfBirth, gender, occupation, entries  
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
    addPatient,
    getPatientById
}