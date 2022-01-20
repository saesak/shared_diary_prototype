import { useEffect, useState } from "react";
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios'

function Entries () {
    
    const [entries, setEntries] = useState([])

    useEffect(() => {
        console.log('retrieve function')
        axios.get('http://localhost:4444/retrieve')
            .then(function (response) {
                var data = response.data
                setEntries(data)
            })
            .catch(function (error) {
                
                console.log(error);
            })
      }, []);

    
    return (
        <div>
            <nav>
                    <Link to="/">Back to Diary</Link>
            </nav>
            <Outlet />
            {entries.map((entry, i) => (
                <div>
                <p>{entry.title} /// {entry.date}</p>
                </div>
            ))}

            
        </div>
    )
}

export default Entries