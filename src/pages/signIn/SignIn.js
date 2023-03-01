import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { InfoUserContext } from "../../context/InfoUserContext";
import Loader from '../../helper/Loader'
import { useDateHook } from "../../hooks/dateHook"

const SignIn = () => {

  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  const { level } = useContext(InfoUserContext)


  const handleLogin = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: 'LOGIN', payload: user })
        setLoader(true)
        setTimeout(() => {
          navigate("/inscription")
          window.location = document.location
        }, 2000)
      })
      .catch((error) => {
        setError(true)
      });
  }
  // loader

  const [loader, setLoader] = useState(false)

  if (loader) {
    setTimeout(() => setLoader(false), 5000)
  }

  // var today = new Date();
  // var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes() + 1);

  // const date = new Date()
  // const actualDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes())
  // console.log(actualDate);
  // if(nextWeek === actualDate) {
  //   console.log('similar date');
  // }
  // console.log(nextWeek);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className='sign-in-container'>
          <div className="container-responsive">
            <h1>Se connecter</h1>
            <div className="form-container">

              <form onSubmit={handleLogin}>

                <div className="inputs">
                  <div className="row">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} autoComplete='off' />
                  </div>
                  <div className="row">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                  </div>

                </div>
                {error && <span>Wrong Email or Password</span>}
                <button type="submit" className="submit-btn">Valider</button>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;