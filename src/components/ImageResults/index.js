import ImageResult from '../ImageResult';
import './style.css';
import { Box, Typography } from '@mui/joy';

function ImageResults({ results, error, selectedImage, setSelectedImage }) {
    const imageCards = results?.map((result) => (
        <ImageResult
            key={result.id}
            result={result}
            isSelected={selectedImage === result.id}
            setSelectedImage={setSelectedImage}
        />
    ));

    const renderMessage = () => {
        if (error) {
            return <Typography variant='warning'>{error}</Typography>
        } else {
            return <Typography>No search results</Typography>
        }
    }

    return (
        <Box className='image-results'>
            {imageCards.length ? imageCards : renderMessage()}
        </Box>
    );
}

export default ImageResults;