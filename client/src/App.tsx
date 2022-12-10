import './App.css';
import axios from 'axios';
import { useState, ChangeEvent  } from 'react';

const App = () => {
    const [value, setValue] = useState('');
    const [response, setResponse] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleClick = async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/approutes', {
                headers: {
                    'Authorization': `Bearer ${value}`
                }
            });
            setResponse(JSON.stringify(data, null, 2));
        } catch (err) {
            setResponse(JSON.stringify(err, null, 2));          
        }
    }

    return (
        <div>
            <input type='text' value={value} onChange={(e) => handleChange(e)}></input>
            <button onClick={handleClick}>test</button>

            <h4>Response:</h4>
            {response
                ? <pre>{response}</pre>
                : null
            }
        </div>
    );
};

export default App;