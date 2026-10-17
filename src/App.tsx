import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StateProvider } from './state/StateProvider';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ModulePage from './pages/ModulePage';
import NotFound from './pages/NotFound';
import { LESSONS } from './data';

export default function App() {
  // Reference LESSONS so tsc type-checks lessons.json against LessonData at build time.
  void LESSONS;
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
