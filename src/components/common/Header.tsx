import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#051e30] text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* logo */}
        <div className="text-xl font-bold cursor-pointer">
          <p className='text-white font-mono font-bold text-3xl'>C<span className='text-orange-600'>o</span>nnect</p>
        </div>

        {/* search */}
        <SearchBar />

        {/* user menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
