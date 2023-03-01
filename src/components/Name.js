import React, { useContext } from "react";
import { InfoUserContext } from "../context/InfoUserContext";

const Name = ({ drag }) => {

  // get the nom, prenom, level of the user connected thank's to the context
  const { nom, prenom } = useContext(InfoUserContext)

  return (
    <span ref={drag}>
       {nom} {prenom}
    </span>
  );
};

export default Name;
