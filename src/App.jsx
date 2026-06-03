import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import HomePage from './pages/HomePage';
import ContentsPage from './pages/ContentsPage';
import EssayPage from './pages/EssayPage';
import SimuladosPage from './pages/SimuladosPage';
import RevisaoPage from './pages/RevisaoPage';
import FlashcardsPage from './pages/FlashcardsPage';
import VideoaulasPage from './pages/VideoaulasPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="cronograma" element={<ContentsPage />} />
        <Route path="conteudos" element={<Navigate to="/cronograma" replace />} />
        <Route path="revisao" element={<RevisaoPage />} />
        <Route path="redacao" element={<EssayPage />} />
        <Route path="exercicios" element={<Navigate to="/" replace />} />
        <Route path="simulados" element={<SimuladosPage />} />
        <Route path="videoaulas" element={<VideoaulasPage />} />
        <Route path="estatisticas" element={<StatsPage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="revisao/estudar" element={<FlashcardsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
