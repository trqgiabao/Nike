import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import IconButton from '@/shared/components/molecules/iconButton/IconButton.jsx';
import NavLink from '@/shared/components/molecules/navLink/NavLink.jsx';
import { ShoppingBag, Heart, Search, Menu, User } from 'lucide-react';
import { Link } from "react-router-dom";
import NikeLogo from "@/assets/nike-3-logo-svg-vector.svg";
import { isAuthenticated, getCurrentUser, clearAuthSession } from '@/features/auth/session';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const updateAuthState = () => {
      const authenticated = isAuthenticated();
      setLoggedIn(authenticated);
      
      if (authenticated) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
    };

    // Initial check
    updateAuthState();

    // Listen for auth state changes
    window.addEventListener('authStateChanged', updateAuthState);

    return () => {
      window.removeEventListener('authStateChanged', updateAuthState);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/search?q=${keyword}`);
    setIsSearchOpen(false);
    setKeyword("");
  };

  const handleLogout = () => {
    clearAuthSession();
    setLoggedIn(false);
    setUser(null);
    navigate('/');
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

          <IconButton badge={3} onClick={() => navigate('/cart')}>
            <ShoppingBag size={20} />
          </IconButton>

          {/* AUTH */}
          <div className="header__auth">
            <IconButton className="header__auth-trigger">
              <User size={20} />
              {loggedIn && user && (
                <span className="header__username">{user.username}</span>
              )}
            </IconButton>

            <div className="header__auth-dropdown">
              {loggedIn ? (
                <>
                  <Link to="/profile" className="header__auth-link">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="header__auth-link header__auth-button">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="header__auth-link">
                    Sign in
                  </Link>
                  <Link to="/signup" className="header__auth-link">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;