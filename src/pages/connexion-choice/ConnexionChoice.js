import React from 'react';
import { NavLink } from 'react-router-dom';

const ConnexionChoice = () => {
    return (
        <div className='container-connexion-choice'>
            <div className="container-link">
           <h1>Bienvenue !</h1>
                <NavLink to='/se-connecter'>
                    <button>Se Connecterrrrrrrrrr</button>
                </NavLink>
                <NavLink to='/creer-un-compte'>
                    <button>Créer un Compteeeeee</button>
                </NavLink>
                <NavLink to='/admin/accueil-admin/ajouter-un-creneau'>
                    <button>Créer un Compteeeeee</button>
                </NavLink>
           </div>
        </div>
    );
};

export default ConnexionChoice;