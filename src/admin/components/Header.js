import React, { useState } from 'react';
import { RiAdminLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom';


const Header = ({toggleClassName}) => {

    return (
        <div className='header-container'>
            <ul>
                <NavLink to='/admin/accueil-admin/ajouter-un-creneau'>
                    <li style={toggleClassName === 1 ? {color: 'white'} : {color: 'var(--background-color)'}} >Ajouter un créneau</li>
                </NavLink>
                <NavLink to='/admin/accueil-admin/voir-les-tableaux'>
                    <li style={toggleClassName === 2 ? {color: 'white'} : {color: 'var(--background-color)'}} >Voir les tableaux</li>
                </NavLink>
                <NavLink to='/admin/accueil-admin/renseignement-joueurs'>
                    <li style={toggleClassName === 3 ? {color: 'white'} : {color: 'var(--background-color)'}} >Renseignements joueurs</li>
                </NavLink>
            </ul>
            <div className="admin-text">
                <span><RiAdminLine /></span>
                <p>Espace Administrateur</p>
            </div>
        </div>
    );
};

export default Header;