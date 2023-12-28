import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const  RangeInput = ({slider, setSlider}) =>{


    const handleChange = (event,newValue) => {
        setSlider(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider

                defaultValue={slider}
                valueLabelDisplay="auto"
                step={100}
                min={0}
                max={30000}
            />
        </Box>
    );
}

RangeInput.propTypes = {
    slider: PropTypes.array,
    setSlider: PropTypes.func,
}

export default RangeInput


