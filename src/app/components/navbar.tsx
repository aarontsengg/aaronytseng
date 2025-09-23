import Link from 'next/link';

const Navbar = () => (
    <nav className='flex justify-center gap-8 p-5 text-black sticky top-0 bg-white z-[1000] opacity-75 font-semibold'>
            <Link href="/" className="hover-underline text-sm" >home</Link>
            <Link href="/#projects" className="hover-underline text-sm">projects</Link>
    </nav>
);

export default Navbar;