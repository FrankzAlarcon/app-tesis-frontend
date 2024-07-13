import { getAllBusiness } from "@/actions/business/get-all";
import CompaniesView from "./_components/companies-view";


async function CompaniesPage() {
  const business = await getAllBusiness()
  const businessArray = business?.data
  return (
    <div className='w-11/12 h-5/6 dashboard-container-shadow p-4'>
      <CompaniesView />
    </div>
  )
}

export default CompaniesPage