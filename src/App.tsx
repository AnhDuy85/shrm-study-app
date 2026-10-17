import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StateProvider } from './state/StateProvider';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ModulePage from './pages/ModulePage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/module/:groupId" element={<ModulePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </StateProvider>
  );
}
