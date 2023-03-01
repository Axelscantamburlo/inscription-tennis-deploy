import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminHomePage = () => {
    return (
        <div className='admin-homepage-container'>
            <ul>
                <NavLink to='ajouter-un-creneau'>

                    <li>Ajouter un créneau</li>
                </NavLink>
                <NavLink to='renseignement-joueurs'>

                    <li>Voir les Joueurs</li>
                </NavLink>
                <NavLink to='utilisateurs'>

                    <li>Utilisateurs</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default AdminHomePage;