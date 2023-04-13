import { Alert } from "react-native";

const API = "http://192.168.1.75:8080/"; //"http://172.20.10.2:8080/";

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

export const getReportes = async (id) => {
  const res = await fetch(`${API}reportes/idrep?p=${id}`);
  return await res.json();
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

export const getReporte = async (id) => {
  const res = await fetch(`${API}reportes/rep?id=${id}`);
  return await res.json();
};

export const saveReporte = async (reporte) => {
  const res = await fetch(`${API}reportes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });
  return await res.json();
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
  return res.status
};

export const cambiarNumeroCuenta = async (user, numero) => {
  const res = await fetch(`${API}usuarios/editarNumCuenta?numero=${numero}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const saveUsuario = async (usuario) => {
  const res = await fetch(`${API}usuarios/usuarioR`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return await res.json();
};

export const saveConductor = async (conductor,nombres) => {
  const res = await fetch(`${API}conductores?nombres=${nombres}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conductor),
  });
  return await res.json();
};

export const getConductor = async (persona) => {
  const res = await fetch(`${API}conductores/getConductor`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
  return res.json();
};

export const uploadImage = async (image) => {
  let localUri = image;
  if (localUri === null) {
    return Alert.alert("Seleccione una imagen");
  } else {
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : "image";

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });
    console.log(formData);
    const res = await fetch(`${API}images`, {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data",
      },
    });
    return;
  }
};
