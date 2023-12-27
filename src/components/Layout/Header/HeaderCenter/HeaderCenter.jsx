import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useContext, useEffect } from 'react';
import { CustomContext } from '../../../../config/context/context';
import { FaUserAlt, FaHeart, FaRegUser } from 'react-icons/fa';
import { IoBagCheck } from "react-icons/io5";


const HeaderCenter = () => {
  const { user, logOutUser, setSearch, search, favorites } = useContext(CustomContext);

  const location = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname !== '/catalog') {
      setSearch('')
    }
  }, [location.pathname])

  return (
    <div className="container">
      <nav className="header__center">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
        <div className="header__center-search">
          <div className="header__center-glass">
            <IoIosSearch />
          </div>
          <input
            value={search}
            type="search"
            className="header__center-field"
            placeholder="Поиск"
            onChange={(e) => {
              if(location.pathname !== '/catalog') {
                navigate('/catalog')
              }
              setSearch(e.target.value)
            }}
          />
        </div>
        <div className="header__center-icons">
          <Link to={'/favorites'}>
            {
              favorites.length ? <FaHeart className="header__center-icon" /> : <AiOutlineHeart className="header__center-icon" />
            }
            
          </Link>
          <Link to={user.email?.length ? '/cart' : '/login'}>
            {
              user.carts?.length ? <IoBagCheck className="header__center-icon"  /> : <HiOutlineShoppingBag className="header__center-icon" />
            }
            
          </Link>
          {location.pathname === '/room' ? (
            <button onClick={logOutUser}>Выйти</button>
          ) : (
            <Link to={user.email?.length ? '/room' : '/login'}>
              {user.email?.length ? (
                <FaUserAlt className="header__center-icon" />
              ) : (
                <FaRegUser className="header__center-icon" />
              )}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderCenter;
