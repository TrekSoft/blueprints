import ImageResult from '../ImageResult';
import './style.css';
import { Box } from '@mui/joy';

function ImageResults({ results, selectedImage, setSelectedImage }) {
    const imageCards = results?.map((result) => (
        <ImageResult
            key={result.id}
            result={result}
            isSelected={selectedImage === result.id}
            setSelectedImage={setSelectedImage}
        />
    ));

    return (
        <Box className='image-results'>
            {imageCards.length ? imageCards : "No results"}
        </Box>
    );
}

export default ImageResults;