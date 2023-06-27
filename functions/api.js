
//export const API = "http://192.168.1.71:8080/"; 
export const API = "https://842f-187-221-239-17.ngrok-free.app/"; 

export const loginuser = async (user) => {
  const res = await fetch(`${API}usuarios/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const loginusergoogle = async (user) => {
  const res = await fetch(`${API}usuarios/loginGoogle`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const editarUsuario = async (user) => {
  const res = await fetch(`${API}usuarios/editarUsuario`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.status;
};

export const cambiarContraseña = async (user, codigo) => {
  const res = await fetch(
    `${API}usuarios/editarContraseña?pass=${user.contraseña}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codigo),
    }
  );
  return res.json();
};

export const cambiarNumeroCuenta = async (user) => {
  const res = await fetch(`${API}usuarios/editarNumCuenta`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const saveUsuario = async (persona) => {
  const res = await fetch(`${API}posibleUsuario`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
  return await res.json();
};

export const getUsuario = async (id) => {
  const res = await fetch(`${API}usuarios/getUsuario?id=`+id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const guardarToken = async (token, correo) => {
  const res = await fetch(`${API}tokens`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: { token: token, correo: correo },
  });
  return res;
};

export const existeToken = async (token) => {
  const res = await fetch(
    `${API}tokens/existeToken?token=${encodeURI(token)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};
