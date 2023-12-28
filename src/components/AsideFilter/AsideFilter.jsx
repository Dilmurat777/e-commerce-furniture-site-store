import FilterSelect from "../FilterSelect/FilterSelect.jsx";
import RangeInput from "./RangeInput.jsx";
import  PropTypes  from 'prop-types';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AsideFilter = ({category, setCategory, sort, setSort, slider, setSlider}) => {

    // const colors = ['red', 'green', 'blue'];

    const resetFilter = () => {
        setSort('')
        setCategory('')
        setSlider([0, 30000])
    }

    return (
        <aside className="catalog__aside">
            <div className="catalog__aside-content">
                <h2 className="catalog__aside-title">
                    Раздел
                </h2>
                <FilterSelect title={'Категория'} state={category} setState={setCategory} array={['Барные стулья', 'Диваны', 'Двухспальные кровати','Буфеты','Комоды','Журнальные столы','Письменные столы','Шкафы','Детский диван']}/>
                <FilterSelect title={'Сортировать'} state={sort} setState={setSort} array={['asc', 'desc', 'rate']}/>
            </div>
            <div className="catalog__aside-content">
                <h2 className="catalog__aside-title">
                    Цена
                </h2>
                    <RangeInput slider={slider} setSlider={setSlider} />
                <div className="catalog__aside-prices">
                    <div className="catalog__aside-price">
                        {slider[0]}
                    </div>
                    -
                    <div className="catalog__aside-price">
                    {slider[1]}
                    </div>
                </div>

            </div>

            <button onClick={resetFilter}>Сбросить</button>
        </aside>
    );
};

AsideFilter.propTypes = {
    category: PropTypes.string,
    setCategory: PropTypes.func,
    sort: PropTypes.string,
    setSort: PropTypes.func,
    slider: PropTypes.array,
    setSlider: PropTypes.func
}

export default AsideFilter;