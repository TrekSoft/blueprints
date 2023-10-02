// It definitely hurts to write this without TypeScript 😿

export const UNITS = {
    'FEET': {label: 'Feet', feet: 1}, 
    'INCHES': {label: 'Inches', feet: .0833}, 
    'METERS': {label: 'Meters', feet: 3.2808},
};

export const ACTIONS = {
    'MEASURE_SELECT': 'select',
    'MEASURE_DESELECT': 'deselect',
    'CONFIG_START': 'config_start',
    'CONFIG_END': 'config_end',
    'CONFIG_EDIT_MEASUREMENT': 'config_edit_measurement',
    'CONFIG_EDIT_UNITS': 'config_edit_units',
    'CONFIG_CANCEL': 'config_cancel',
    'CONFIG_SAVE': 'config_save',
    'MEASURE_START': 'measure_start',
    'MEASURE_END': 'measure_end',
    'MEASURE_CANCEL': 'measure_cancel',
}

export const initialState = {
    isSelected: false,
    configData: {
        start: undefined,
        end: undefined,
        measurement: '',
        units: UNITS.FEET,
        pixelsPerFeet: undefined,
    },
    measurementData: {
        start: undefined,
        end: undefined,
    }
};

export function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.MEASURE_SELECT:
            return {...initialState, isSelected: true};
        case ACTIONS.MEASURE_DESELECT:
            return {...initialState, isSelected: false};
        case ACTIONS.CONFIG_START:
            return {...state, configData: { ...initialState.configData, start: action.point }};
        case ACTIONS.CONFIG_END:
            return {...state, configData: { ...state.configData, end: action.point }};
        case ACTIONS.CONFIG_EDIT_MEASUREMENT:
            return {...state, configData: { ...state.configData, measurement: action.measurement}};
            case ACTIONS.CONFIG_EDIT_UNITS:
                return {...state, configData: { ...state.configData, units: action.units}};
        case ACTIONS.CONFIG_CANCEL:
            return {...state, configData: { ...initialState.configData }};
        case ACTIONS.CONFIG_SAVE:
            const {start, end, measurement, units} = state.configData;
            return {
                ...state,
                configData: {
                    ...state.configData,
                    pixelsPerFeet: length(start, end) / (measurement * units.feet)
                }
            };
        case ACTIONS.MEASURE_START:
            return {...state, measurementData: { ...initialState.measurementData, start: action.point }};
        case ACTIONS.MEASURE_END:
            return {...state, measurementData: { ...state.measurementData, end: action.point }};
        case ACTIONS.MEASURE_CANCEL:
            return {...state, measurementData: { ...initialState.measurementData }};
        default:
            throw new Error("This action type is not supported.");
    }
}

export function length(startPoint, endPoint) {
    return Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
}