import express from 'express'
import patientService from '../services/patientService'
import { toAddNewPatientEntry, toNewPatientEntry } from '../utils'
import { EntryWithoutId } from '../../types'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedPatient = patientService.addPatient(newPatientEntry)
        res.json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
})

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id)

    if (patient) {
      res.send(patient)
    }
    else {
      res.sendStatus(404)
    }
})

router.post('/:id/entries', (req, res) => {
  console.log("ping ", req.params.id);
  
    const patient = patientService.getPatientById(req.params.id)
    if (!patient) {
      res.sendStatus(500)
    } else {

      try {
        const newEntry = toAddNewPatientEntry(req.body)
        const addedEntry = patientService.addEntry(patient, newEntry)
        res.json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
    }         
})

export default router