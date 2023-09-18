function calcularDistancia(lat1, lon1, lat2, lon2) {
    const raioDaTerra = 6371; // Raio médio da Terra em quilômetros
  
    // Converter graus para radianos
    const radLat1 = (Math.PI * lat1) / 180;
    const radLon1 = (Math.PI * lon1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLon2 = (Math.PI * lon2) / 180;
  
    // Diferença de latitude e longitude
    const difLat = radLat2 - radLat1;
    const difLon = radLon2 - radLon1;
  
    // Fórmula de Haversine para calcular a distância
    const a =
      Math.sin(difLat / 2) * Math.sin(difLat / 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(difLon / 2) * Math.sin(difLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Distância em quilômetros
    const distanciaKm = raioDaTerra * c;
  
    // Converter para metros
    const distanciaMetros = distanciaKm * 1000;
  
    return { km: distanciaKm, metros: distanciaMetros };
}
  
// // Exemplo de uso
// const ponto1 = { latitude: 52.5200, longitude: 13.4050 };
// const ponto2 = { latitude: 48.8566, longitude: 2.3522 };

// const distancia = calcularDistancia(ponto1.latitude, ponto1.longitude, ponto2.latitude, ponto2.longitude);

// console.log(`A distância entre os dois pontos é de ${distancia.km} km ou ${distancia.metros} metros.`);

export default calcularDistancia