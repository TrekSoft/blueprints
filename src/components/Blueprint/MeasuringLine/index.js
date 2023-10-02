import { ACTIONS, UNITS, length } from '../../../reducers/MeasuringReducer';
import './style.css';
import { Box, Input, Select, Option, Button, IconButton } from '@mui/joy';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext } from 'react';
import { measurementContext } from '../../../contexts/MeasurementContext';

function MeasuringLine({start, end, isConfig}) {
    const {state, dispatch} = useContext(measurementContext);

    const configBox = () => {
        const top = Math.min(start.y, end.y) - 60;
        const left = start.y < end.y ? start.x : end.x;

        const handleMeasurementChange = (e) => {
            if (e?.target) {
                dispatch({type: ACTIONS.CONFIG_EDIT_MEASUREMENT, measurement: e.target.value});
            }
        }

        const handleUnitsChange = (e, newValue) => {
            if (newValue) {
                dispatch({type: ACTIONS.CONFIG_EDIT_UNITS, units: newValue});
            }
        }

        return (
            <Box className="measuring-line__config" style={{top, left: left - 200}}>
                <Input value={state.configData.measurement} onChange={handleMeasurementChange} autoFocus sx={{width: '120px'}} type="text" />
                <Select value={state.configData.units} onChange={handleUnitsChange} sx={{flex:1}}>
                    <Option value={UNITS.FEET}>{UNITS.FEET.label}</Option>
                    <Option value={UNITS.INCHES}>{UNITS.INCHES.label}</Option>
                    <Option value={UNITS.METERS}>{UNITS.METERS.label}</Option>
                </Select>
                <Button onClick={() => dispatch({type: ACTIONS.CONFIG_SAVE})}>Calibrate</Button>
                <IconButton
                    variant="solid"
                    onClick={() => dispatch({type: ACTIONS.CONFIG_CANCEL})}
                >
                    <ClearIcon  />
                </IconButton>
            </Box>
        );
    };

    const measurementBox = () => {
        const upperY = Math.min(start.y, end.y);
        const height = Math.abs(start.y - end.y);
        const top = upperY + height/2;

        const leftX = Math.min(start.x, end.x);
        const width = Math.abs(start.x - end.x);
        const left = leftX + width/2;

        const feet = length(start, end) / state.configData.pixelsPerFeet;

        return (
            <Box 
                top={top}
                left={left}
                className="measuring-line__result"
            >
                {`${feet.toFixed(2)} ft`}
            </Box>
        );
    }

    const displayBox = () => {
        return isConfig ? configBox() : measurementBox();
    }

    return (
        <>
            <svg className="measuring-line" width="100%" height="100%">
                <line 
                    x1={start.x} 
                    y1={start.y} 
                    x2={end ? end.x : start.x} 
                    y2={end ? end.y : start.y+3} 
                    stroke="#F9541C" 
                    strokeWidth={3}
                />
            </svg>

            {end && displayBox()}
        </>
    );
}

export default MeasuringLine;