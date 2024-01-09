export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <a href="/" className="hover:text-gray-300">
            Roster Generator
          </a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
          <a href="#" className="hover:text-gray-300">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
