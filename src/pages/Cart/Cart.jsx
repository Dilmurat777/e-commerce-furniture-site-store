import { useContext } from 'react';
import { CustomContext } from '../../config/context/context';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api/api';

const Cart = () => {
  const { user, setUser, addCartsCountPlus, addCartsCountMinus } = useContext(CustomContext);

	const navigate = useNavigate()

	const closeItem = (itemId) => {

		api.patch(`users/${user.id}`, {
			headers: {
				'content-type': 'application/json',
			},
			json: {
				carts: user.carts.filter(item => item.id !== itemId)
			}
		}).json().then((res) => console.log(res))
		
		const updatedCarts = user.carts.filter(item => item.id !== itemId);
	
		setUser(prevUser => ({
			...prevUser,
			carts: updatedCarts,
		}));
		localStorage.setItem('user', JSON.stringify({ ...user, carts: updatedCarts }));
	}



  return (
    <section className="cart">
      <div className="container">
        <div className="cart__top">
          {
						user?.carts?.length === 0 ? <h2 className="cart__title">Ваша корзина</h2> : ''
					}
          <p className="cart__count">{user.carts?.reduce((acc, rec) => acc + rec.count, 0)} предмета</p>
        </div>
        <div className="cart__row">
          {user.carts?.map((item) => (
            <div key={item.id} className="cart__card">
              <div className="cart__card-item">
                <img src={`${item.images[0]}`} alt="" />
                <div className="cart__card-info">
                  <h3 className="cart__card-title">{item.title}</h3>
                  <p className="cart__card-size">
                    Размер(Ш×Д×В):
                    {item.width} СМ X {item.height} СМ X {item.deep} СМ
                  </p>

                  <div className="cart__card-size">
                    Количество :{item.count}
                    <div className="card__sizes-count">
                      <button
                        className="card__sizes-minus"
                        onClick={() => addCartsCountMinus(item.id)}>
                        -
                      </button>
                      <span>{user.carts.find((el) => el.id === item.id).count}</span>
                      <button
                        className="card__sizes-plus"
                        onClick={() => addCartsCountPlus(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <p className="cart__card-price">
                  {item.price} ₽
                  <br />
									{
										item.price * item.count
									}
                </p>
              </div>
              <button className="cart__card-delete" onClick={() => closeItem(item.id)}>X</button>
            </div>
          ))}
        </div>

				{
					user.carts?.length ? <div className="cart__bottom">
          <p className="cart__bottom-count">Итоговая стоимость: {user.carts?.reduce((acc, rec) => acc + rec.price * rec.count, 0)} ₽</p>
          <button className="cart__bottom-btn" onClick={() => navigate('/checkout')}>Оформить заказ</button>
        </div> : ''
				}

        
      </div>
    </section>
  );
};

export default Cart;
