import { createContext, useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const CustomContext = createContext();

const Context = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: '' }); // userContent
 
  const [hitSale, setHitSale] = useState([]); // hitSale

  const [favorites, setFavorites] = useState([]); // hitSale

  const [search, setSearch] = useState(''); // Search


  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    if (localStorage.getItem('favorites') !== null) {
      setFavorites(JSON.parse(localStorage.getItem('favorites')));
    }
  }, []);

  // start userContent

  const registerUser = (user) => {
    api
      .post('register', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          ...user,
          point: 0,
          orders: [],
          carts: [],
          city: '',
          street: '',
          home: '',
        },
      })
      .json()
      .then((res) => {
        setUser(res.user);
        navigate('/');
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  };

  const loginUser = (user) => {
    api
      .post('login', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          ...user,
        },
      })
      .json()
      .then((res) => {
        setUser(res.user);
        navigate('/');
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  };

  // end userContent

  // start hitSale

  const getHitSale = () => {
    api('products?_sort=sale&_order=desc&_limit=12')
      .json()
      .then((res) => setHitSale(res));
  };

  // end hitSale

  // start Favorites

  const favoritesHandler = (product) => {
    let findProduct = favorites.some((item) => item.id === product.id);
    if (findProduct) {
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setFavorites((prev) => [...prev, product]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // end Favorites

	// start logout
	const logOutUser = () => {
    setUser({ email: '' });
    localStorage.removeItem('user');
    navigate('/');
  };
	// end logout

  // start cart

  const addCarts = (product) => {
    api
      .patch(`users/${user.id}`, {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          carts: [...user.carts, {...product, count: 1}]
        },
      })
      .json()
      .then((res) => setUser(res));
			localStorage.setItem('user', JSON.stringify(user))
  };

	const addCartsCountPlus = (id) => {
		api.patch(`users/${user.id}`, {
			headers: {
				'content-type': 'application/json',
			},
			json: {
				carts: user.carts.map(item => {
					if(item.id === id) {
						return {...item, count: item.count + 1}
					}
					return item
				})
			}
		}).json().then((res) => setUser(res))
		localStorage.setItem('user', JSON.stringify(user))
	}

	const addCartsCountMinus = (id) => {
		api.patch(`users/${user.id}`, {
			headers: {
				'content-type': 'application/json',
			},
			json: {
				carts: user.carts.find(item => item.id === id).count > 1 ? user.carts.map(item => {
					if(item.id === id) {
						return {...item, count: item.count - 1}
					}
					return item
				}) : user.carts.filter((item) => item.id !== id)
			}
		}).json().then((res) => setUser(res))
		localStorage.setItem('user', JSON.stringify(user))
	}

  // end cart

	// start add order
	const addOrder = (order, setPopup, redirect) => {
		api.patch(`users/${user.id}`, {
			headers: {
				'content-type': 'application/json',
			},
			json: {
        point: Math.floor(user.point + order.totalPrice / 100 * 7), 
				orders: [...user.orders, order],
				carts: []
			}
		}).json().then((res) => {
			localStorage.setItem('user', JSON.stringify(res))
			setUser(res)
			setPopup(true)
			redirect()
		})
	}
	// end add order

 
  let value = {
    registerUser,
    loginUser,
    setUser,
    logOutUser,
    getHitSale,
    favoritesHandler,
    favorites,
    hitSale,
    user,
    setSearch,
    search,
		addCarts,
		addCartsCountPlus,
		addCartsCountMinus,
		addOrder,
  };

  return <CustomContext.Provider value={value}>{children}</CustomContext.Provider>;
};

Context.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Context;
