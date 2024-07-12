import axios from 'axios';

const callAPI = async (config) => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        return null
    }
};

export default callAPI;
