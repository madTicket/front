// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function LoginButton() {

//     const [data, setData] = useState(null);

//     useEffect(() => {
//         fetch('http://madticket.pythonanywhere.com/login')
//             .then(response => response.json())
//             .then(data => setData(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     return (
//         <div>
//             {data && <div>Data from Flask: {data.key}</div>}
//         </div>
//     );
// }