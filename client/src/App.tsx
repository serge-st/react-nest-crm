import axios from 'axios';
import './App.css';

const App = () => {
    const handleClick = async () => {
        const {data} = await axios.get('http://localhost:3000/');
        console.log(data)
    }

    return (
        <div>
            <button onClick={handleClick}>test</button>
        </div>
    );
};

export default App;