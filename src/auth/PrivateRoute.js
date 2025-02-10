import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute(){
  const { signed } = useContext(AuthContext);
  return signed && <Outlet/> 
};