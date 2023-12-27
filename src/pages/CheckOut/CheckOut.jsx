import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../config/context/context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const CheckOut = () => {
	const navigate = useNavigate()
	const {addOrder, user} = useContext(CustomContext)  
	const [popup, setPopup] = useState(false); // popup
	const [count, setCount] = useState(15); // count

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			name: user?.name || '',
			surname: user?.surname || '',
			email: user?.email || '',
			phone: user?.phone || '',
		},
	});

	useEffect(() => {
		setValue('name', user?.name || '');
		setValue('surname', user?.surname || '');
		setValue('email', user?.email || '');
		setValue('phone', user?.phone || '');
	}, [user, setValue]);

	const submitForm = (data) => {
		let order = {
			...data, 
			status: 'pending',
			order: user.carts, 
			totalPrice: user.carts?.reduce((acc, rec) => acc + rec.price * rec.count, 0)
		}
		addOrder(order, setPopup, redirect)
	}


	const redirect = () => {
		setInterval(() => {
				setCount(prev => {
						if (prev < 2) {
								navigate('/')
								return 1
						}
						return prev - 1
				})
		},1000)
}


	return (
		<section className="checkout">
			<div className="container">
				<h2  className="cart__title">Оформления заказов</h2>
				<form className="checkout__form" onSubmit={handleSubmit(submitForm)}>

					<div className="checkout__form-block">
						<h3 className="checkout__form-title">Данные покупателя</h3>
						<div className="checkout__form-fields">
							<input {...register('name')} defaultValue={user?.name || ''} type="name" className="checkout__form-field" placeholder="Имя" />
							<input {...register('surname')} defaultValue={user?.surname || ''} type="surname" className="checkout__form-field" placeholder="Фамилия" />
							<input {...register('email')} defaultValue={user?.email || ''} type="email" className="checkout__form-field" placeholder="E-mail" />
							<input {...register('phone')} defaultValue={user?.phone || ''} type="phone" className="checkout__form-field" placeholder="Телефон" />
						</div>
					</div>

					<div className="checkout__form-block">
						<h3 className="checkout__form-title">Ваше заказ</h3>
						<ul className="checkout__form-list">
							<li className="checkout__form-item">
								<p className="checkout__form-product">Товар</p>
								<div className="checkout__form-box">
								<p className="checkout__form-price">Количество</p>
								<p className="checkout__form-price">Всего</p>
								</div>
							</li>
							{
								user.carts?.map((item) => (
									<li key={item.id} className="checkout__form-item">
										<p className="checkout__form-product">{item.title}</p>
										<div className="checkout__form-box">
										<p className="checkout__form-product">{item.count} шт.</p>
										<p className="checkout__form-price">${item.price}</p>
										</div>
									</li>
								))
							}
							
							<li className="checkout__form-item checkout__form-item-count">
								<p className="checkout__form-product ">Итоговая стоимость:</p>
								<p className="checkout__form-price">
									{user.carts?.reduce((acc, rec) => acc + rec.price * rec.count, 0)}
								</p>
							</li>
						</ul>
					</div>

					<div className="checkout__form-block">
						<h3 className="checkout__form-title">Адрес получателя</h3>
						<div className="checkout__form-fields">
							<input {...register('country')} type="text" className="checkout__form-field" placeholder="Страна"/>
							<input {...register('city')} type="text" className="checkout__form-field" placeholder="Город"/>
							<input {...register('street')} type="text" className="checkout__form-field" placeholder="Улица"/>
							<input {...register('home')} type="text" className="checkout__form-field" placeholder="Дом"/>
							<input {...register('flat')} type="text" className="checkout__form-field" placeholder="Квартира"/>
						</div>
					</div>
					<div className="checkout__form-block">
						<h3 className="checkout__form-title">Способ оплаты</h3>
						<div className="checkout__form-list">
							<label className="checkout__form-label">
								<input type="checkbox" /> Оплата наличными
							</label>
							<button className="checkout__form-btn">Разместить заказ</button>
						</div>
					</div>
					<div className="checkout__form-block">
						<h3 className="checkout__form-title">Комментарии</h3>
						<textarea {...register('info')} className="checkout__form-commit" placeholder="Дополнительная информация"></textarea>
					</div>
				</form>
							{
								popup ?
								<div className="checkout__popup">
									<h2>Ваше заказ успешно отправлен</h2>
									<p>Через {count} секунд вас перекинет на главную страницу</p>
									<button onClick={() => navigate('/')}>Перейти на главную страницу</button>
								</div>
							: ''
						}
						{
							popup ? <div className="checkout__bg"></div> : ''
						}
			</div>
		</section>
	);
};

export default CheckOut;