import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#181a20] text-white flex flex-col items-center pt-16">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          <span className="text-blue-400">CryptoBot</span>
          <span className="text-yellow-400"> Pro</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Advanced cryptocurrency trading platform with AI-powered signals, TradingView integration, and secure USDT payments.
        </p>
        <h2 className="text-2xl font-bold mb-2">Welcome to CryptoBot Pro!</h2>
        <p className="mb-6 text-gray-400">
          Unlock the full potential of your cryptocurrency trading experience with <span className="text-blue-400 font-semibold">AI-powered signals</span>, <span className="text-blue-400 font-semibold">live charts via TradingView</span>, and secure <span className="text-blue-400 font-semibold">USDT payments</span>. Our platform provides a seamless and automated trading experience for traders of all levels.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <button
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-300 transition"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button className="bg-gray-800 text-white font-semibold px-6 py-2 rounded border border-gray-700 hover:bg-gray-700 transition">Learn More</button>
        </div>
      </div>
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mt-8 px-4">
        <div className="bg-[#23272f] rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold mb-2 text-blue-400">Trading Dashboard</h3>
          <p className="text-gray-400 text-sm">A user-friendly dashboard that offers a complete overview of your trading activity and portfolio.</p>
        </div>
        <div className="bg-[#23272f] rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold mb-2 text-blue-400">Live Charts</h3>
          <p className="text-gray-400 text-sm">Integrated with TradingView, offering real-time price charts and technical analysis tools.</p>
        </div>
        <div className="bg-[#23272f] rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold mb-2 text-blue-400">Copy Trading</h3>
          <p className="text-gray-400 text-sm">Copy the trades of top-performing users and strategies with a single click.</p>
        </div>
        <div className="bg-[#23272f] rounded-lg p-6 shadow text-center">
          <h3 className="text-lg font-bold mb-2 text-blue-400">USDT Payments</h3>
          <p className="text-gray-400 text-sm">Secure payments using USDT (TRC20, BEP20, ERC20) for fast and reliable transactions.</p>
        </div>
      </div>
    </div>
  );
} 