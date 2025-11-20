import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    
    const { i18n } = useTranslation();

    const handleSearch = (e) => {
        e.preventDefault();

        const currentLang = i18n.language; 

        if (keyword.trim()){
            navigate(`/search?q=${keyword}&lang=${currentLang}`);
            setKeyword('');
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ margin: '1rem 0' }}>
            <input
                type="text"
                placeholder="ค้นหาสินค้าและบทความ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ padding: '0.5rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem' }}>
                🔍 ค้นหา (FR-02)
            </button>
        </form>
    );
}

export default SearchBar;