import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import IconButton from '@/shared/components/molecules/iconButton/IconButton.jsx';
import NavLink from '@/shared/components/molecules/navLink/NavLink.jsx';
import { ShoppingBag, Heart, Search, Menu, User } from 'lucide-react';
import { Link } from "react-router-dom";
import NikeLogo from "@/assets/nike-3-logo-svg-vector.svg";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/search?q=${keyword}`);
    setIsSearchOpen(false);
    setKeyword("");
  };

  return (
    <header className="header">
      <div className="header__container">

        {/* LEFT */}
        <div className="header__left">
          <IconButton className="header__menu-button">
            <Menu size={24} />
          </IconButton>

          <img src={NikeLogo} className="header__logo">
          </img>
        </div>

        {/* NAV */}
        <nav className="header__nav">
          <NavLink href="#">New & Featured</NavLink>
          <NavLink href="#">Men</NavLink>
          <NavLink href="#">Women</NavLink>
          <NavLink href="#">Kids</NavLink>
          <NavLink href="#">Sale</NavLink>
        </nav>

        {/* RIGHT */}
        <div className="header__right">

          {/* SEARCH */}
          <div className="header__search">
            <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </IconButton>

            {isSearchOpen && (
              <form onSubmit={handleSearch} className="header__search-form">
                <input
                  type="text"
                  placeholder="What do you want find?"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="header__search-input"
                  autoFocus
                />
              </form>
            )}
          </div>

          <IconButton>
            <Heart size={20} />
          </IconButton>

          <IconButton badge={3}>
            <ShoppingBag size={20} />
          </IconButton>

          {/* AUTH */}
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

              <Link to="/profile" className="header__auth-link">
                Profile
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;