import './style.css';
import {ReactComponent as GovWellLogo} from '../../assets/logo.svg';
import { Box, IconButton, Tooltip } from '@mui/joy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useContext } from 'react';
import { measurementContext } from '../../contexts/MeasurementContext';
import { ACTIONS } from '../../reducers/MeasuringReducer';

function Header({title}) {
    const {state, dispatch} = useContext(measurementContext);
    
    const handleClickMeasurement = () => {
        if (state.isSelected) {
            dispatch({type: ACTIONS.MEASURE_DESELECT});
        } else {
            dispatch({type: ACTIONS.MEASURE_SELECT});
        }
    }

    return (
        <Box className='header'>
            <Box className='header__logo'>
                <GovWellLogo height={46} width={147} style={{ paddingLeft: '25px' }} />
            </Box>

            <Tooltip title="Measuring Tool" variant="solid">
                <IconButton
                    variant="outlined"
                    onClick={handleClickMeasurement}
                >
                    {/* Yes, the style hack here is hideous... 🤮 */}
                    <DesignServicesIcon style={state.isSelected ? {color: '#F9541C'} : {}} />
                </IconButton>
            </Tooltip>

            <Box className='header__title'>
                {title}
            </Box>
        </Box>
    );
}

export default Header;