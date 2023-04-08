import React from "react";
import { useState } from "react";

const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones

  const [values, setValues] = useState({
    userName: '',
    userEmail: ''
  });

  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const validateUserName = (userName) => {
    if (userName.length >= 3 && userName[0] != " ") {
      return true;
    } else {
      return false;
    }
  };

  const validateUserEmail  = (email) => {
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return validEmail.test(email)
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (validateUserName(values.name) && validateUserEmail(values.email)) {
      setMessage(true);
      setError(false)
      return;
    } 
    else {
      setError(true);
      setMessage(false)
      return;
    }
  }

  return (
<div>
      <form onSubmit={onSubmitForm}>
        <input type="text"
          name='name'
          placeholder='Ingrese nombre y apellido'
          onChange={onChangeHandler}
          value={values.name} />
        <input type="email"
          name='email'
          placeholder='Ingrese su email'
          onChange={onChangeHandler}
          value={values.email} />
        <button type='submit'>Enviar</button>
      </form>

      {error && <div>Por favor verifique su información nuevamente.</div>}
      {message && <div>Gracias {values.name}, te contactaremos cuanto antes vía mail</div> }
    </div>
  );
};

export default Form;
