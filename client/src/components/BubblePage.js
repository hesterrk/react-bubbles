import React, { useState, useEffect } from "react";
import { axiosWithAuth } from './utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const history = useHistory();

  // fetch your colors data from the server when the component mounts: GET axiosWithAuth
  // set that data to the colorList state property
  //do log-out 

useEffect(() => {
  getColorData();
}, [])

function getColorData() {
  axiosWithAuth().get('/api/colors')
  .then(res => {
    console.log(res);
    setColorList(res.data);
    console.log(res.data)
})
  .catch(err=> console.log(err));

};

const onLogout = (e) => {
  localStorage.removeItem('token')
  history.push('/')

};


  return (
    <>
    <div>
      <button onClick={onLogout}>Log out</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      </div>
    </>
  );
};

export default BubblePage;