import { useContext, useMemo } from 'react';
import './style.css';
import { Box } from '@mui/joy';
import { measurementContext } from '../../contexts/MeasurementContext';
import { ACTIONS } from '../../reducers/MeasuringReducer';
import MeasuringLine from './MeasuringLine';

function Blueprint({imageUrl}) {
    const {state, dispatch} = useContext(measurementContext);

    const handleBlueprintClick = ({ clientX, clientY }) => {
        const { isSelected, configData } = state;
        if (isSelected) {
            if (configData.pixelsPerFeet) {
                handleMeasurementClick(clientX, clientY);
            } else {
                handleConfigClick(clientX, clientY);
            }
        }
    };

    const handleMeasurementClick = (x, y) => {
        const {start, end} = state.measurementData;

        if (!start) {
            dispatch({type: ACTIONS.MEASURE_START, point: {x, y}});
        } else if(!end) {
            dispatch({type: ACTIONS.MEASURE_END, point: {x, y}});
        } else{
            dispatch({type: ACTIONS.MEASURE_CANCEL});
        }
    };

    const handleConfigClick = (x, y) => {
        const {start, end} = state.configData;

        if (!start) {
            dispatch({type: ACTIONS.CONFIG_START, point: {x, y}});
        } else if(!end) {
            dispatch({type: ACTIONS.CONFIG_END, point: {x, y}});
        } else{
            dispatch({type: ACTIONS.CONFIG_CANCEL});
        }
    };

    const measuringLine = useMemo(() => {
        if(state.configData.start && !state.configData.pixelsPerFeet) {
            return <MeasuringLine start={state.configData.start} end={state.configData.end} isConfig />;
        } else if(state.measurementData.start) {
            return <MeasuringLine start={state.measurementData.start} end={state.measurementData.end} />;
        } else {
            return null;
        }
    }, [state]);

    return (
        <Box className='blueprint'>
            {imageUrl ? 
                <img 
                    className={`blueprint__image ${state.isSelected ? 'blueprint__image--measuring' : ''}`}
                    src={imageUrl} 
                    onClick={handleBlueprintClick} /> : 
                'Search for and select a blueprint on the left'
            }
            {measuringLine}
        </Box>
    );
}

export default Blueprint;