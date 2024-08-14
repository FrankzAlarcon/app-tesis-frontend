
interface InfoActivity {
  name: string;
  value: number;
}

const infoActivities: InfoActivity[] = [
  {
    name: 'Innovatech Solutions',
    value: 21,
  },
  {
    name: 'Ecuatransport S.A',
    value: 16,
  },
  {
    name: 'FLAC S.A',
    value: 10,
  },
  {
    name: 'PagoFácil S.A',
    value: 8,
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
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

export default getChatInfoActivities;