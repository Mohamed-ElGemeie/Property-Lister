export default function Header() {
  return (
    <header className="bg-emerald-800 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hire me</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                Listings
              </a>
            </li>
            <li>
              <a href="/create" className="hover:underline">
                Create
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
