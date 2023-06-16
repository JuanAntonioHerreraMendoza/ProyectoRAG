const API = "http://192.168.1.75:8080/";

export const existeCorreo = async (correo) => {
  const res = await fetch(`${API}usuarios/existeUsuario?correo=${correo}`);
  return res.json();
};

export const enviarCorreo = async (correo) => {
  const res = await fetch(`${API}correo?correo=${correo}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  });
  return await res.json();
};
