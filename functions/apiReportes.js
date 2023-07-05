import { API } from "./api";

export const getReportes = async (id) => {
  const res = await fetch(`${API}reportes/idrep?p=${id}`);
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

export const getConteos = async (id) => {
  const res = await fetch(`${API}reportes/Countrep?id=${id}`);
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

export const getInfracciones = async () => {
  const res = await fetch(`${API}incidentes`);
  return await res.json();
};
