import "./Header.css"
import  IconButton  from '@/shared/components/molecules/iconButton/IconButton.jsx';
import  NavLink  from '@/shared/components/molecules/navLink/NavLink.jsx';
import { ShoppingBag, Heart, Search, Menu, User } from 'lucide-react';
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <IconButton className="header__menu-button">
            <Menu size={24} />
          </IconButton>
          <a href="/" className="header__logo">
            <svg height="24" width="72" viewBox="0 0 72 24" fill="currentColor">
              <path d="M14.16 0L3 21.6h6.24l2.04-4.08h10.68l.72 4.08H28.2L21.36 0h-7.2zm.84 6.72l3.6 7.68h-7.2l3.6-7.68zm17.28-2.16c-2.52 0-4.68.84-6.12 2.28l1.56 3.24c1.08-1.08 2.52-1.68 4.08-1.68 1.92 0 3 .84 3 2.16v.36h-3.72c-3.84 0-6.12 1.8-6.12 4.8 0 2.76 2.16 4.68 5.28 4.68 2.04 0 3.6-.72 4.56-1.92v1.68h5.04v-9.36c0-4.08-2.88-6.24-7.56-6.24zm2.52 11.04c0 1.44-1.32 2.52-3.12 2.52-1.32 0-2.16-.6-2.16-1.56 0-1.08.84-1.68 2.4-1.68h2.88v.72zm21.12-10.8h-5.88l-4.08 10.32L41.88 4.8h-6l7.08 16.08c-.84 1.92-2.04 2.52-3.84 2.52-.84 0-1.56-.12-2.16-.36v4.44c.72.24 1.56.36 2.52.36 3.6 0 5.76-1.44 7.56-5.76L55.92 4.8zm16.08-.24c-5.52 0-9.48 3.72-9.48 8.64s3.96 8.64 9.48 8.64 9.48-3.72 9.48-8.64-3.96-8.64-9.48-8.64zm0 13.08c-2.28 0-3.96-1.8-3.96-4.44s1.68-4.44 3.96-4.44 3.96 1.8 3.96 4.44-1.68 4.44-3.96 4.44z" />
            </svg>
          </a>
        </div>
        <nav className="header__nav">
          <NavLink href="#">New & Featured</NavLink>
          <NavLink href="#">Men</NavLink>
          <NavLink href="#">Women</NavLink>
          <NavLink href="#">Kids</NavLink>
          <NavLink href="#">Sale</NavLink>
        </nav>
        <div className="header__right">
          <IconButton>
            <Search size={20} />
          </IconButton>
          <IconButton>
            <Heart size={20} />
          </IconButton>
          <IconButton badge={3}>
            <ShoppingBag size={20} />
          </IconButton>
          <div className="header__auth">
            <IconButton className="header__auth-trigger">
              <User size={20} />
            </IconButton>
            <div className="header__auth-dropdown">
              <Link to="/signin" className="header__auth-link">
                              Sign in
              </Link>

              <Link to="/signup" className="header__auth-link">
                              Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
