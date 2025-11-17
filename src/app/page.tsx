'use client';

import { useState } from 'react';
import { Home, Search, BarChart3, Lightbulb, Menu, X } from 'lucide-react';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import DetailView from './components/DetailView';
import CompareView from './components/CompareView';
import InsightsView from './components/InsightsView';
import { MobileApp, WebApp } from '@/lib/types';

type View = 'home' | 'search' | 'detail' | 'compare' | 'insights';

export default function TrendSaaSApp() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedApp, setSelectedApp] = useState<MobileApp | WebApp | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectApp = (app: MobileApp | WebApp) => {
    setSelectedApp(app);
    setCurrentView('detail');
    setMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    setSelectedApp(null);
    setCurrentView('home');
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'compare', label: 'Comparar', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedApp(null);
              }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">TrendSaaS</h1>
                <p className="text-xs text-gray-600">Análise de Apps & SaaS</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as View);
                      if (item.id !== 'detail') setSelectedApp(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id as View);
                        if (item.id !== 'detail') setSelectedApp(null);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && <HomeView onSelectApp={handleSelectApp} />}
        {currentView === 'search' && <SearchView onSelectApp={handleSelectApp} />}
        {currentView === 'detail' && selectedApp && (
          <DetailView app={selectedApp} onBack={handleBackToHome} />
        )}
        {currentView === 'compare' && <CompareView />}
        {currentView === 'insights' && <InsightsView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">TrendSaaS</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Plataforma de análise de tendências para apps mobile e web. Descubra oportunidades,
                compare métricas e tome decisões baseadas em dados.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Dados Públicos
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Análise em Tempo Real
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Fórmulas Proprietárias
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Análise de Apps Mobile</li>
                <li>• Análise de Sites SaaS</li>
                <li>• Comparação Multiplataforma</li>
                <li>• Previsões de Crescimento</li>
                <li>• Insights de Mercado</li>
              </ul>
            </div>

            {/* Data Sources */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Fontes de Dados</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• App Store (público)</li>
                <li>• Google Play (público)</li>
                <li>• Análise de Sites</li>
                <li>• GitHub & ProductHunt</li>
                <li>• Scraping Ético</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p className="text-sm">
              © 2024 TrendSaaS. Dados estimados baseados em fontes públicas e fórmulas proprietárias.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Plataforma otimizada para criadores indie e pequenos investidores.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
