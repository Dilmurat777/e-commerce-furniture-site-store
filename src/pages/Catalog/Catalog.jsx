import AsideFilter from '../../components/AsideFilter/AsideFilter.jsx';
import { Fragment, useContext, useEffect, useState } from 'react';
import Card from '../../components/Card/Card.jsx';
import api from '../../config/api/api.jsx';
import { CustomContext } from '../../config/context/context.jsx';

const Catalog = () => {
  const { search } = useContext(CustomContext);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [slider, setSlider] = useState([0, 30000]);
  
  useEffect(() => {
    let queryParamFromTo = `price_gte=${slider[0]}&price_lte=${slider[1]}`
    let queryParamsApi = `?${search.length ? `category_like=${search}&` : ''}${
      category.length ? `category=${category}&` : ''
    }${
      sort.length && sort !== 'rate'
        ? `_sort=price&_order=${sort}&`
        : sort.length
        ? `_sort=rate&_order=desc`
        : ''
    }`;
    api(`products${queryParamsApi}${queryParamFromTo}`)
      .json()
      .then((res) => setProducts(res));
  }, [search, category, sort, slider]);

  return (
    <main>
      <section className="catalog">
        <div className="container">
          <div className="catalog__row">
            <AsideFilter
              slider={slider}
              setSlider={setSlider}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
            />
            <div className="hitSale__row catalog__content">
              {products.map((item) => (
                <Fragment key={item.id}>
                  <Card item={item} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Catalog;
