
import{FaSearch}from'react-icons/fa';
import{Link}from'react-router-dom';
export default function Header() {
  return (
    <header className='bg-white shadow-md '>
       <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
        <Link to='/'>   
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-500'>Sam</span>
            <span className='text-blue-500'>Estate</span>
        </h1>
        </Link>
        <form className="bg-slate-100 px-3 py-1 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm sm:text-base flex-1"
          />
          <FaSearch className="text-blue-500 ml-2" />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/About'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          <Link to='/Signin'>
          <li className=' text-slate-700 hover:underline'>Sign in</li>
</Link>
        </ul>
        </div>
    </header>
  );
}
