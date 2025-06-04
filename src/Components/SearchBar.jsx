import React, { useContext, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LocationContext } from '../contexts/locationContext';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidmFudnUiLCJhIjoiY21iNXg0N3BrMXk4dDJrcjBxZDQwNDNybCJ9.99YEzE6o1GjDRg6LaCkazg';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const { setLocation } = useContext(LocationContext);

    useEffect(() => {
        if (!input) {
            setResults([]);
            setError(null);
            return;
        }

        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
        )
            .then(res => res.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    setResults(data.features);
                    setError(null);
                } else {
                    setResults([]);
                    setError('Không tìm thấy kết quả');
                }
            })
            .catch(() => {
                setResults([]);
                setError('Lỗi khi gọi API');
            });
    }, [input]);

    const handleSelect = (place) => {
        const [lon, lat] = place.center;
        setLocation([lon, lat]);
        setInput(place.place_name);
        setResults([]);
        setInput('')
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            padding: '6px 10px',
            width: 450,
            backgroundColor: '#fff',
            gap: 8,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <FaSearch style={{ color: '#888', marginRight: 8, fontSize: 18 }} />
                <input
                    type="text"
                    placeholder="Thành phố, quận, huyện hoặc 21.029450, 105.854444 ,..."
                    style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {results.length > 0 && (
                <ul style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    maxHeight: 150,
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: 4,
                }}>
                    {results.map(place => (
                        <li
                            key={place.id}
                            style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                            onClick={() => handleSelect(place)}
                        >
                            {place.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
