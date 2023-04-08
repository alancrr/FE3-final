import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Detail = () => {
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un user en especifico
  const [dentist, setDentist] = useState({})
  const params = useParams();

  const getDentistDetail = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const data = await response.json();
    setDentist(data)
  };

  useEffect(() => {
    getDentistDetail();
  })

  return (
    <>
      <h1>Detail Dentist {dentist.id} </h1>
      {/* aqui deberan renderizar la informacion en detalle de un user en especifico */}
      {/* Deberan mostrar el name - email - phone - website por cada user en especifico */}
      <div className='container'>
      <img className='doctor' src="../images/doctor.jpg" alt="doctor" width="100x" height="100px" />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{dentist.name}</td>
                <td>{dentist.email}</td>
                <td>{dentist.phone}</td>
                <td>{dentist.website}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Detail