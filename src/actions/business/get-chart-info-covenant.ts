
interface AgreementType {
  type: string;
  value: number;
}

// simular la respuesta de la api

const typesAgreement: AgreementType[] = [
  {
    type: 'Laboral',
    value: 75,
  },
  {
    type: 'Vinculación',
    value: 120,
  },
  {
    type: 'Convalidación',
    value: 10,
  },
];


const getTypesAgreementChartInfo = async (): Promise<any> => {
  const info = new Promise((resolve) => {
    setTimeout(() => {
      resolve(typesAgreement);
    }, 1000);
  });

  const response = await info as AgreementType[];

  const data = {
    labels: response.map((item: AgreementType) => item.type),
    datasets: [{
      label: 'Solictudes',
      data: response.map((item: AgreementType) => item.value),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

export default getTypesAgreementChartInfo;


