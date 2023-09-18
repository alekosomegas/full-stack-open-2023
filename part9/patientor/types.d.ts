export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Entry {

}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation: string,
    entries?: Entry[]
}

export type NonSensitivePatientData = Omit<Patient, 'ssn', | 'entries'>

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}