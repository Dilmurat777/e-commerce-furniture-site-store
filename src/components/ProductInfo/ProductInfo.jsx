import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustomContext } from '../../config/context/context';
import {AiOutlineHeart} from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";

const ProductInfo = ({ product }) => {

  const {favorites, favoritesHandler} = useContext(CustomContext)

  const colors = ['red', 'green', 'blue'];

  return (
    <div className="product__info">
      <h2 className="product__info-title">{product.title}</h2>
      <p className="product__info-category">{product.category}</p>
      <div className="product__info-row">
        <p className="product__info-price">{product.price}</p>
        <button className="product__info-btn">Купить</button>
        <span className="product__info-fav" onClick={() => favoritesHandler(product)}>
                {
                    favorites.some(el => el.id === product.id) ? <FaHeart color="red"/> : <AiOutlineHeart/>
                }
        </span>
        <span>Добавить желаемое</span>
      </div>
      <div className="product__info-selects">
        <ul className="product__info-color">
          {colors.map((item, idx) => (
            <li key={idx} style={{ background: item }}>
              ss
            </li>
          ))}
        </ul>
        <ul className="product__info-count">1</ul>
        <ul className="product__info-sizes">
          <li>
            {product.width} СМ х {product.height} СМ х {product.deep} СМ
          </li>
        </ul>
      </div>
      <div className="product__info-description">
        <h2>Описание</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
  }),
};

export default ProductInfo;
