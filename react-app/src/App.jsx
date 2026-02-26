import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BossSiomaiMasterFranchisePage from "./BossSiomaiMasterFranchisePage";
import BigstopPage from "./pages/BigstopPage";
import BossSiomaiPage from "./pages/BossSiomaiPage";
import FranchiseSimplePage from "./pages/FranchiseSimplePage";
import { franchiseConfigs } from "./pages/franchiseConfigs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/boss-siomai" replace />} />
        <Route path="/bigstop" element={<BigstopPage />} />
        <Route
          path="/herrera-pharmacy"
          element={<FranchiseSimplePage config={franchiseConfigs["herrera-pharmacy"]} />}
        />
        <Route path="/boss-siomai" element={<BossSiomaiPage />} />
        <Route
          path="/boss-chickn"
          element={<FranchiseSimplePage config={franchiseConfigs["boss-chickn"]} />}
        />
        <Route
          path="/boss-fries"
          element={<FranchiseSimplePage config={franchiseConfigs["boss-fries"]} />}
        />
        <Route
          path="/burger2go"
          element={<FranchiseSimplePage config={franchiseConfigs.burger2go} />}
        />
        <Route
          path="/noodle-king"
          element={<FranchiseSimplePage config={franchiseConfigs["noodle-king"]} />}
        />
        <Route path="/master-demo" element={<BossSiomaiMasterFranchisePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
