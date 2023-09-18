import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry } from "../../src/types";
import diariesService from "./services/diariesService";
import Entry from './components/Entry'
import AddEntryModal from "./components/AddEntryModal/index";
import axios from "axios";

const App = () => {
  const [diaries, setDairies] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDairiesList = async () => {
      const dairies = await diariesService.getAll();
      setDairies(dairies);
    };
    void fetchDairiesList();
  }, []);

  const submitNewDiaryEntry = async (values: NewDiaryEntry) => {
    try {
      const entry = await diariesService.create(values);
      setDairies(diaries.concat(entry))
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          // setError(message);
        } else {
          // setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        // setError("Unknown error");
      }
    }
  }

  return (
    <div>
      <AddEntryModal onSubmit={submitNewDiaryEntry} />
      {diaries.map(d => <Entry entry={d} />)}
    </div>
  );
};

export default App;