const API = "http://192.168.1.75:8080/" //"http://172.20.10.2:8080/";

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

export const getReportes= async (id) =>{
  const res = await fetch(`${API}reportes/idrep?p=${id}`);
  return await res.json();  
}

export const getReporte= async (id) =>{
  const res = await fetch(`${API}reporte/${id}`);
  return await res.json();
}

export const saveReporte = async (reporte) =>{
  console.log(JSON.stringify(reporte))
  const res = await fetch(`${API}/reportes/newReporte`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });
  return console.log(res);
}

export const saveUsuario = async (usuario) =>{
  console.log(JSON.stringify(usuario))
  const res = await fetch(`${API}usuarios/usuarioR`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return await res.json();
}

