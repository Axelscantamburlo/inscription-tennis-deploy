// import React, { useContext, useEffect, useState } from 'react';
// // import { getAuth, signInWithCustomToken } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from '../../../context/AuthContext';
// // import { setDoc, doc } from 'firebase/firestore';
// // import { db } from '../../../config/firebase-config';


// const AdminLogin = ({ socket }) => {
//     // const [identifiant, setIdentifiant] = useState('')
//     // const [password, setPassword] = useState('') 
//     // const [error, setError] = useState(false)

//     // const navigate = useNavigate()

//     // const { dispatch } = useContext(AuthContext)
//     // const auth = getAuth();

//     // const handleSubmit = (e) => {
//     //     e.preventDefault()
//     //     if (identifiant && password) {
//     //         socket.emit("check-identifiant", identifiant)
//     //         socket.emit('check-password', password)
//     //     }
//     // }

//     // useEffect(() => {
        
//     // socket.on('token', data => {
//     //     signInWithCustomToken(auth, data)
//     //     .then((userCredential) => {
//     //              setDoc(doc(db, "admin", userCredential.user.uid), {
                    
//     //                 admin: true
//     //               })
//     //             const user = userCredential.user;
//     //             dispatch({ type: 'LOGIN', payload: user })
//     //             navigate("admin-homepage")
//     //         })
//     //         .catch((error) => {
//     //             console.log(error);  
//     //         });
//     // })

//     // socket.on("error", data => {
//     //     setError(true)
//     // })
//     // }, [socket])


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder='Identifiant' name='email' onChange={(e) => setIdentifiant(e.target.value)} />
//                 <input type="password" name="password" placeholder='Mot de Passe' onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">Login</button>
//                 {error && <span>Wrong Email or Password</span>}
//             </form>
//             <button>Click me !</button>
//         </div>
//     );
// };

// export default AdminLogin;