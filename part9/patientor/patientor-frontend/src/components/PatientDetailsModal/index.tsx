import { Patient } from '../../types';

export interface Props {
    patient: Patient | null
}

const PatientsDetailsModal = ({ patient }: Props) => {

    return (
        <div>
            <p>{patient?.name}</p>
            <p>{patient?.occupation}</p>
            <p>{patient?.ssn}</p>
        </div>
    )
}

export default PatientsDetailsModal