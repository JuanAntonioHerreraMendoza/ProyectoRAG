import { API } from "./api";


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

export const getConteoInfracciones = async (id) => {
  const res = await fetch(`${API}multas/countInfracciones?id=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
