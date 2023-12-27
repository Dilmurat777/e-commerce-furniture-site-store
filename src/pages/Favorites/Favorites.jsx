import { Fragment, useContext, useEffect, useState } from 'react';
import { CustomContext } from '../../config/context/context';
import Card from '../../components/Card/Card';

const Favorites = () => {
  const { favorites } = useContext(CustomContext);

  const [page, setPage] = useState(1);

  let favoritesPages = new Array(Math.ceil(favorites.length / 4)).fill(null, 0);

  useEffect(() => {
    if (page > favorites.length) {
      setPage(favoritesPages.length);
    }
  }, [favorites]);

  if (favorites.length) {
    return (
      <section className="hitSale">
        <div className="container">
          <h2 className="hitSale__title">Избранные товары</h2>
          <div className="hitSale__row">
            {favorites
              .filter((item, idx) => idx >= page * 4 - 4 && idx < page * 4)
              .map((item) => (
                <Fragment key={item.id}>
                  <Card item={item} />
                </Fragment>
              ))}
          </div>
          {favoritesPages.length > 1 && (
            <ul>
              {favoritesPages.map((item, idx) => (
                <li key={idx} onClick={() => setPage(idx + 1)}>
                  {idx + 1}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <h2 style={{ textAlign: 'center', fontSize: 25, marginTop: 50 }}>Список избранных пуст.</h2>
    );
  }
};

export default Favorites;
