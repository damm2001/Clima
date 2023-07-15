let plot = (data) => { 
  const ctx = document.getElementById('myChart');

  const dataset = {
      labels: data.hourly.time, /* ETIQUETA DE DATOS */
      datasets: [{
          label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
          data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      }]
  };

  const config = {
      type: 'line',
      data: dataset,
  };

  const chart = new Chart(ctx, config);
};

let plotTWO = (data) => { 
  const ctx = document.getElementById('myChart2');

  const dataset = {
      labels: data.hourly.time, /* ETIQUETA DE DATOS */
      datasets: [{
          label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
          data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      }]
  };

  const config = {
      type: 'pie',
      data: dataset,
  };

  const chart = new Chart(ctx, config);
};


let load = (data) => { 
  console.log(data);
  

  plot(data);
  plotTWO(data);
}

let loadInocar = () => { 
  let URL_proxy = 'http://localhost:8080/'    // Coloque el URL de acuerdo con la opción de proxy
  let URL = URL_proxy + 'https://www.inocar.mil.ec/mareas/consultan.php';
  fetch(URL)
      .then(response => response.text())
      .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/html");
      console.log(xml);
      let contenedorMareas = xml.getElementsByTagName('div')[0];
      let contenedorHTML = document.getElementById('table-container');
      contenedorHTML.innerHTML = contenedorMareas.innerHTML;
      })
      .catch(console.error);

}



(
  function () {
      let meteo = localStorage.getItem('meteo');
      if(meteo==null){
          let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise&timezone=auto';
          fetch( URL )
          .then(response => response.json())
          .then(data => {
              loadInocar();
              load(data);
              /* GUARDAR DATA EN MEMORIA */
              localStorage.setItem("meteo", JSON.stringify(data))
              
          })
          .catch(console.error);


      } else{
          /* CARGAR DATA EN MEMORIA */
          
          load(JSON.parse(meteo))
          loadInocar();
      }   
  }
)();

