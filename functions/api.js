const API = "http://192.168.1.75:8080/";

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
  console.log(id)
  const res = await fetch(`${API}reportes/idrep?p=${id}`);
  return await res.json();  
}

export const getReporte= async (id) =>{
  const res = await fetch(`${API}reporte/${id}`);
  return await res.json();
}

export const saveReporte = async (reporte) =>{
  console.log(JSON.stringify(reporte))
  const res = await fetch(`${API}newReporte`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });
  return console.log(res);
}

