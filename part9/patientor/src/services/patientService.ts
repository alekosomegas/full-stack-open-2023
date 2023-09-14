import patientsData from '../../data/patients'
import { NonSensitivePatientData, Patient } from '../../types'

const getPatients = (): Patient[] => {
    return patientsData
}

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation  
    }))
}

export default {
    getPatients,
    getNonSensitiveEntries
}