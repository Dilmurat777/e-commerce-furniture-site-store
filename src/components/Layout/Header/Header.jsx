
import { useLocation } from 'react-router-dom';
import HeaderCenter from './HeaderCenter/HeaderCenter';
import HeaderTop from './HeaderTop/HeaderTop';

const Header = () => {

	const location = useLocation()

	return (
		<>
			{
				location.pathname === '/' ? <HeaderTop/> : ''
			}
			<HeaderCenter/>
		</>
	);
};

export default Header;