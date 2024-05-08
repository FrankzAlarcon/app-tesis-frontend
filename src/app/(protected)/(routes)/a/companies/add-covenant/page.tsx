import { getAllBusiness } from "@/actions/business/get-all";
import AddCompany from '../_components/add-company-view'

const AddCovenantPage = async () => {

  const business = await getAllBusiness()
  const businessArray = business?.data

  // add default image to business array logo: '/agrements-companies/kushki_logo.jpg'
  businessArray.forEach((company: any) => {
    company.logo = '/agrements-companies/kushki_logo.jpg'
  })


  return (
    <>
      <AddCompany companies={businessArray} />
    </>
  )
}

export default AddCovenantPage