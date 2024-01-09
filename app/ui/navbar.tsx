export default function Navbar() {
  return (
    <nav className='bg-gray-800 p-4 text-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='text-lg font-semibold'>
          <a href='/' className='hover:text-gray-300'>
            Roster Generator
          </a>
        </div>
        <div className='hidden space-x-4 md:flex'>
          <a href='#' className='hover:text-gray-300'>
            Home
          </a>
          <a href='#' className='hover:text-gray-300'>
            About
          </a>
          <a href='#' className='hover:text-gray-300'>
            Services
          </a>
          <a href='#' className='hover:text-gray-300'>
            Contact
          </a>
          <a href='#' className='hover:text-gray-300'>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
