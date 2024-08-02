import { useState, useEffect } from 'react';
import axios from 'axios';

const Fetch = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the function that fetches the data
        const fetchData = async () => {
            try {
                // Make the GET request
                const response = await axios.get('https://api.emmatech.dev/agac/all');
                // Set the data from the response
                setPhotos(response.data.photos); // Access response.data
            } catch (err) {
                // Handle error and set error state
                setError(err);
            } finally {
                // Set loading to false after the request is finished
                setLoading(false);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <p>There was an error fetching the data!</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Fetched Data:</h1>
            <pre>{JSON.stringify(photos, null, 2)}</pre>
        </div>
    );
};

export default Fetch;
