import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between">
      <div className="font-bold text-xl">CryptoBot</div>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/premium" className="hover:underline text-yellow-400">Premium</Link>
      </nav>
    </header>
  );
}