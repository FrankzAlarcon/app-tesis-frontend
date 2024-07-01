
interface AgreementTypeWithCompany {
  type: string;
  value: number;
}

// simular la respuesta de la api

const typesAgreement: AgreementTypeWithCompany[] = [
  {
    type: 'Laboral Publico',
    value: 5,
  },
  {
    type: 'Laboral Privado',
    value: 12,
  },
  {
    type: 'Vinculación',
    value: 3,
  },
];


const getTypesAgreementCompanyChartInfo = async (): Promise<any> => {
  const info = new Promise((resolve) => {
    setTimeout(() => {
      resolve(typesAgreement);
    }, 1000);
  });

  const response = await info as AgreementTypeWithCompany[];

  const labels = response.map((item: AgreementTypeWithCompany) => item.type);
  const data = {
    labels: labels,
    datasets: [{
      label: 'Convenios por tipo',
      data: response.map((item: AgreementTypeWithCompany) => item.value),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
      ],
      borderWidth: 1
    }]
  };

  return data;
}

export default getTypesAgreementCompanyChartInfo;