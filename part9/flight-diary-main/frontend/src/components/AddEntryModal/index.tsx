import { NewDiaryEntry } from '../../../../src/types'
import AddEntryForm from './AddEntryForm'

interface Props {
    onSubmit: (values: NewDiaryEntry) => void
}

const AddEntryModal = ({onSubmit}: Props) => (
  <AddEntryForm onSubmit={onSubmit} />
)

export default AddEntryModal