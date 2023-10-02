import './style.css';
import { Box } from '@mui/joy';

function ImageResult({result, isSelected, setSelectedImage}) {
    return (
        <Box
            key={result.id}
            className={`image-result ${isSelected && 'image-result--selected'}`}
            onClick={() => setSelectedImage(result.id)}
        >
            <img className='image-result__image' src={result.link} />
            <Box className='image-result__label'>{result.id}</Box>
        </Box>
    );
}

export default ImageResult;