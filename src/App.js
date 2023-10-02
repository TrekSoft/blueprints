import { useMemo, useState, useReducer, createContext } from 'react';
import { Box, Sheet, CssBaseline, CssVarsProvider } from '@mui/joy';
import './App.css';
import theme from './theme';
import Header from './components/Header';
import ImageSearch from './components/ImageSearch';
import ImageResults from './components/ImageResults';
import { ACTIONS, initialState, reducer } from './reducers/MeasuringReducer';
import { measurementContext } from './contexts/MeasurementContext';
import Blueprint from './components/Blueprint';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedImageData = useMemo(() => {
    return images?.filter(image => image.id === selectedImage)[0];
  }, [images, selectedImage]);

  const handleSelectImage = (image) => {
    dispatch({type: ACTIONS.MEASURE_DESELECT});
    setSelectedImage(image);
  }

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <measurementContext.Provider value={{state, dispatch}}>
        <Sheet sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
          <Header title={selectedImageData?.title} />
          <Box className='body'>
            <Box className='sidebar'>
              <ImageSearch setResults={setImages} />
              <ImageResults results={images} selectedImage={selectedImage} setSelectedImage={handleSelectImage} />
            </Box>
            <Blueprint imageUrl={selectedImageData?.link} />
          </Box>
        </Sheet>
      </measurementContext.Provider>
    </CssVarsProvider>
  );
}

export default App;
