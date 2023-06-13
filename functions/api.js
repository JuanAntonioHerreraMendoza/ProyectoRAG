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

export const getReportes = async (id) => {
  const res = await fetch(`${API}reportes/idrep?p=${id}`);
  return await res.json();
};

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

export const getReporte = async (id) => {
  const res = await fetch(`${API}reportes/rep?id=${id}`);
  return await res.json();
};

export const getUltimoReporte = async (id) => {
  const res = await fetch(`${API}reportes/Ultimorep?id=${id}`);
  return await res.json();
};

export const getConteos = async (id)=>{
  const res= await fetch(`${API}reportes/Countrep?id=${id}`);
  return await res.json();
}

export const getImage = async (image) => {
  const res = await fetch(`http://192.168.1.75:8080/images/${image}`);
  return res.body;
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

export const editarUsuario = async (user) => {
    const res = await fetch(
      `${API}usuarios/editarUsuario`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
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


export const cambiarImagen = async (user,imagen) => {
  const res = await fetch(`${API}usuarios/editarImagenPerfil?imagen=${imagen}`, {
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

export const getConductorInfo = async (licencia, circulacion, placas) => {
  const res = await fetch(
    `${API}conductores/buscarValor?placas=${placas}&licencia=${licencia}&circulacion=${circulacion}`
  );
  return res.json();
};

export const getMultasConductor = async (conductor) => {
  const res = await fetch(`${API}multas/buscarMultas`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conductor),
  });
  return res.json();
};

export const getMultasPersona = async (persona) => {
  const res = await fetch(`${API}multas/multasPersona`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
  return res.json();
};


export const uploadImage = async (image,path) => {
  let localUri = image;
  if (localUri === null) {
    return Alert.alert("Seleccione una imagen");
  } else {
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : "image";

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });
    const res = await fetch(`${API}images?path=${path}`, {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data",
      },
    });
    return;
  }
};

export const uploadImagesReg = async (images) => {
  let localUri = images;
  let formData = new FormData();
  if (localUri === null) {
    return Alert.alert("Seleccione una imagen");
  } else {
    for (let i = 0; i < localUri.length; i++) {
      let filename = localUri[i].uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : "image";

      formData.append("file", { uri: localUri[i].uri, name: filename, type });
    }
    const res = await fetch(`${API}images/registroImgs?path=imagesRegistro`, {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data",
      },
    });
    return;
  }
};

export const deleteImage = async (path,file) => {
  const res = await fetch(`${API}images/deleteImg?path=${path}&file=${file}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return;
};
