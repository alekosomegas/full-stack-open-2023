import { NewPatientEntry } from '../types'

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
      }
    
      return name;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date: ' + dateOfBirth);
    }
    return dateOfBirth;
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
      }
    
      return occupation;
}

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
      }
    return ssn
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };
  
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing');
}

export { toNewPatientEntry }