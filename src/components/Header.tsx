export default function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between">
      <div className="font-bold text-xl">CryptoBot</div>
      <nav className="flex space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/dashboard" className="hover:underline">Dashboard</a>
        <a href="/premium" className="hover:underline text-yellow-400">Premium</a>
      </nav>
    </header>
  );
}