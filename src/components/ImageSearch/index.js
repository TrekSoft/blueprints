import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Input, Box, IconButton } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';


function ImageSearch({ setResults, setError }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const searchButtonRef = useRef(null);

    useEffect(() => {
        const enterHandler = (e) => {
            if (e.key === "Enter" && searchButtonRef?.current) {
                // Doing it this way we avoid duplicating the disabled condition and onClick logic.
                searchButtonRef.current.click();
            } 
        }

        document.addEventListener('keypress', enterHandler);

        return () => document.removeEventListener('keypress', enterHandler)
    }, [searchButtonRef]);

    const onSearchClick = () => {
        setIsLoading(true);
        axios.get('https://customsearch.googleapis.com/customsearch/v1', {
            params: {
                q: `${searchTerm} floor plan blueprint`,
                num: 10,
                searchType: 'image',
                key: process.env.REACT_APP_API_KEY,
                cx: process.env.REACT_APP_CX
            }
        }).then(results => {
            setResults(results.data.items.map((item, index) => { 
                return {
                    id: index,
                    link: item.link, 
                    title: item.title
                };
            }));
            setIsLoading(false);
        }).catch(error => {
            setError('Oops, something wrong wrong!');
        });
    }

    return (
        <FormControl>
            <FormLabel>Building type</FormLabel>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Input 
                    placeholder='e.g. School'
                    variant="outlined"
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <IconButton
                    disabled={!searchTerm.length || isLoading}
                    onClick={onSearchClick}
                    variant="outlined"
                    ref={searchButtonRef}
                >
                    <Box sx={{ display: 'flex' }}>
                        {isLoading ?  <CircularProgress size={20} /> : <SearchIcon />}
                    </Box>
                </IconButton>
            </Box>
        </FormControl>
    );    
}

export default ImageSearch;