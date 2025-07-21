import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Spot from './pages/Spot';
import Futures from './pages/Futures';
import OptionsSignals from './pages/OptionsSignals';
import Margin from './pages/Margin';
import Copy from './pages/Copy';
import News from './pages/News';
import Sentiment from './pages/Sentiment';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spot" element={<Spot />} />
              <Route path="/futures" element={<Futures />} />
              <Route path="/options" element={<OptionsSignals />} />
              <Route path="/margin" element={<Margin />} />
              <Route path="/copy" element={<Copy />} />
              <Route path="/news" element={<News />} />
              <Route path="/sentiment" element={<Sentiment />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
