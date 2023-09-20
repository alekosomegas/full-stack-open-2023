import patientsData from '../../data/patients'
import { NonSensitivePatientData, Patient, NewPatientEntry, EntryWithoutId } from '../../types'
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
    return patientsData
}

const getPatientById = (id: string) => {
    const patient: Patient | undefined = patientsData.find(p => p.id === id)    
    return patient
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

const addEntry = (patient: Patient, entry: EntryWithoutId) => {
    if (!patient.entries) patient.entries = []
    patient.entries.push({id: uuid(),
        ...entry})
}

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    getPatientById,
    addEntry
}