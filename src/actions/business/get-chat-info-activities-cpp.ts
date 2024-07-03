
interface InfoActivity {
  name: string;
  value: number;
}

const infoActivities: InfoActivity[] = [
  {
    name: 'LABORAL',
    value: 74,
  },
  {
    name: 'CONVALIDACION LABORAL',
    value: 3,
  },
  {
    name: 'CONVENIOS',
    value: 20,
  },
  {
    name: 'VINCULACION',
    value: 115,
  },
  {
    name: 'CONVALIDACION VINCILACION',
    value: 10,
  },
  {
    name: 'PUBLICACIONES EN BOLSA DE TRABAJO',
    value: 14,
  },
]

const getChatInfoActivities = async (): Promise<any> => {
  const info = new Promise((resolve) => {
    setTimeout(() => {
      resolve(infoActivities);
    }, 1000);
  });

  const response = await info as InfoActivity[];

  const data = {
    labels: response.map((item: InfoActivity) => item.name),
    datasets: [{
      label: 'Actividades',
      data: response.map((item: InfoActivity) => item.value),

      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

export default getChatInfoActivities;