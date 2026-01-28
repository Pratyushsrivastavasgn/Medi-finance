import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CostComparison from './pages/CostComparison';
import InsuranceAnalysis from './pages/InsuranceAnalysis';
import FinancingOptions from './pages/FinancingOptions';
import CostSimulator from './pages/CostSimulator';
import SummaryReport from './pages/SummaryReport';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="compare" element={<CostComparison />} />
        <Route path="insurance" element={<InsuranceAnalysis />} />
        <Route path="financing" element={<FinancingOptions />} />
        <Route path="simulator" element={<CostSimulator />} />
        <Route path="summary" element={<SummaryReport />} />
      </Route>
    </Routes>
  );
}

export default App;
