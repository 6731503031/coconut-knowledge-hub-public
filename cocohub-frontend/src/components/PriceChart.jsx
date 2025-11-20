import React from 'react';
import { 
    LineChart, Line, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const formatChartData = (data) => {
    return data.map(item => ({
        date: item.date, 
        central: item.centralPrice,
        northeast: item.northeastPrice,
        south: item.southPrice,
    }));
};

function PriceChart({ priceData }) {
    const { t } = useTranslation();
    const data = formatChartData(priceData);

    if (data.length === 0) {
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}>{t('price.noData')}</Typography>;
    }

    return (
        <Box sx={{ width: '100%', height: 400, mt: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" /> 
                    <YAxis domain={['auto', 'auto']} /> 
                    <Tooltip 
                        labelFormatter={(label) => t('common.date') + ": " + label}
                        formatter={(value, name) => [value, t(`price.region.${name}`)]}
                    />
                    <Legend /> 
                    
                    <Line type="monotone" dataKey="central" stroke="#8884d8" name="central" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="northeast" stroke="#82ca9d" name="northeast" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="south" stroke="#ffc658" name="south" activeDot={{ r: 8 }} />

                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default PriceChart;