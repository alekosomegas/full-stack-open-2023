import { useState, useEffect } from "react";
import { DiaryEntry } from "../../src/types";
import dairiesService from "./services/dairiesService";
import Entry from './components/Entry'

const App = () => {
  const [diaries, setDairies] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDairiesList = async () => {
      const dairies = await dairiesService.getAll();
      setDairies(dairies);
    };
    void fetchDairiesList();
  }, []);


  return (
    <div>
      {diaries.map(d => <Entry entry={d} />)}
    </div>
  );
};

export default App;