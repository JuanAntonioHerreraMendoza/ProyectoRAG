import { API } from "./api";


export const getImage = async (image) => {
    const res = await fetch(API+`images/${image}`);
    return res.body;
  };

  export const cambiarImagen = async (user, imagen) => {
    const res = await fetch(
      `${APII}usuarios/editarImagenPerfil?imagen=${imagen}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    return await res.json();
  };
  export const uploadImage = async (image, path) => {
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
  
  export const deleteImage = async (path, file) => {
    const res = await fetch(`${API}images/deleteImg?path=${path}&file=${file}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return;
  };  