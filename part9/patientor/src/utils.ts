export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string,
    entries?: Entry[]
}


export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string,
    criteria: string
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital"
    discharge: Discharge
}

interface SickLeave {
    startDate: string,
    endDate: string
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    sickLeave?: SickLeave
    employerName?: string
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isNumber = (num: unknown): num is number => {
return typeof num === 'number';
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

const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error('Incorrect description: ' + description);
    }
    return description
}

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
        throw new Error('Incorrect specialist: ' + specialist);
    }
    return specialist
}

const parseEntryType = (type: unknown): string => {
    if (!isString(type) && !(type === 'Hospital' || type === 'HealthCheck' || type === 'OccupationalHealthcare')) {
        throw new Error('Incorrect type: ' + type);
    }
    return type
}

const isDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect type: ' + object);
    };
    if (('date' in object) && 'criteria' in object) {
        const dis = {
            date: parseDateOfBirth(object.date),
            criteria: parseSpecialist(object.criteria)
        }
        return dis
    }
    throw new Error('Incorrect type: ' + object);
}
  
const parseDischarge = (discharge: unknown): Discharge => {
    if (!isDischarge(discharge)) {
        throw new Error('Incorrect discharge: ' + discharge);
    }
    return discharge as Discharge
}
// what is the type of the entry use switch after parsing?
const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
  };
  
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect gender: ' + rating);
    }
    return rating;
};

const isSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect type: ' + object);
    };
    if (('startDate' in object) && 'endDate' in object) {
        const dis = {
            startDate: parseDateOfBirth(object.startDate),
            endDate: parseDateOfBirth(object.endDate)
        }
        return dis
    }
    throw new Error('Incorrect type: ' + object);
}
  
const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!isSickLeave(sickLeave)) {
        throw new Error('Incorrect sickLeave: ' + sickLeave);
    }
    return sickLeave as SickLeave
}

const toAddNewPatientEntry = (object: unknown) : EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

      interface BaseEntry {
        description: string;
        date: string;
        specialist: string;
        diagnosisCodes?: Array<Diagnose['code']>;
        sickLeave? : SickLeave,
        employerName? : string
      }

      if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
          let newEntry: BaseEntry = {
              description: parseDescription(object.description),
              date: parseDateOfBirth(object.date),
              specialist: parseSpecialist(object.specialist),
            }
          if ('diagnosisCodes' in object) {
            newEntry = {
                ...newEntry,
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
            }
          }
        switch (object.type) {
            case 'Hospital':
                if ('discharge' in object && object.type === 'Hospital')
                return {
                    ...newEntry,
                    type: object.type,
                    discharge: parseDischarge(object.discharge)
                }
            case 'HealthCheck': 
                if ('healthCheckRating' in object && object.type === 'HealthCheck') {
                    return {
                        ...newEntry,
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    }
                }
                case 'OccupationalHealthcare':
                if (object.type === 'OccupationalHealthcare') {
                    if ('sickLeave' in object) {
                        newEntry = {
                            ...newEntry,
                            sickLeave: parseSickLeave(object.sickLeave)
                        }
                    }
                    if ('employerName' in object) {
                        newEntry = {
                            ...newEntry,
                            employerName: parseName(object.employerName)
                        }
                    }
                    return {
                        ...newEntry,
                        type: object.type
                }
        }
      }
    }

    throw new Error('Incorrect data: some fields are missing');
}

export { toNewPatientEntry, toAddNewPatientEntry }