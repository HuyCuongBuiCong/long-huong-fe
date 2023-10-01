import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import PatientDetail from "./components/PatientDetail";
import HistoryTable from "./components/HistoryTable";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="/patient_detail" element={<PatientDetail />} />
          </Route>
          <Route path="/history_table" element={<HistoryTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
