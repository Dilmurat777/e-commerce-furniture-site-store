import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './../../config/api/api';
import HitSale from './../../components/HitSale/HitSale';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import ProductSlider from '../../components/ProductSlider/ProductSlider';

const Product = () => {
  const params = useParams();

  const [product, setProduct] = useState({});


  useEffect(() => {
    api(`products/${params.id}`)
      .json()
      .then((res) => setProduct(res));
  }, [params.id]);

	if('id' in product) {
		return (
			<>
				<section className='product'>
					<div className='container'>
						<div className='product__row'>
							<ProductSlider product={product}/>
							<ProductInfo product={product}/>
						</div>
					</div>
				</section>
	
				<HitSale />
			</>
		);
	}else {
		<h2>Loading...</h2>
	}


};

export default Product;
