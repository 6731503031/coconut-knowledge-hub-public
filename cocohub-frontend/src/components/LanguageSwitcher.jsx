import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';

function LanguageSwitcher() {

    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    return (
        <Box sx={{ ml: 2, border: '1px solid #fff', borderRadius: 1 }}>
            <Button
                onClick={() => changeLanguage('en')}
                sx={{
                    color: 'white',
                    fontWeight: currentLanguage === 'en' ? 'bold' : 'normal',
                    backgroundColor: currentLanguage === 'en' ? 'rgba(255,255,255,0.2)' : 'transparent'
                }}
            >
                EN
            </Button>
            <Button
                onClick={() => changeLanguage('th')}
                sx={{
                    color: 'white',
                    fontWeight: currentLanguage === 'th' ? 'bold' : 'normal',
                    backgroundColor: currentLanguage === 'th' ? 'rgba(255,255,255,0.2)' : 'transparent'
                }}
            >
                TH
            </Button>
        </Box>
    );
}

export default LanguageSwitcher;