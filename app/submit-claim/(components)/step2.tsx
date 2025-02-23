import { PolicyDetails } from "../(hooks)/useSubmissionData"

interface Step2Props {
  data?: PolicyDetails
  onNext: () => void
  onBack: () => void
}

export default function Step2({ data, onNext, onBack }: Step2Props) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const policyDetails = {
        policyNumber: formData.get("policyNumber") as string,
        licenseIssueDate: formData.get("licenseIssueDate") as string,
        drivingLicenseNumber: formData.get("drivingLicenseNumber") as string,
        carRegistrationNumber: formData.get("carRegistrationNumber") as string,
        registeredKeeper: formData.get("registeredKeeper") as string,
        mainDriver: formData.get("mainDriver") as string,
        vehicleUsageType: formData.get("vehicleUsageType") as string,
        priorAccidentsLast5Years: !!formData.get("priorAccidentsLast5Years")
      }
      window.localStorage.setItem(
        "claimForm_policy", 
        JSON.stringify(policyDetails)
      )
    onNext()
  }
  return(
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className=" text-lg font-semibold">Policy Details</h2>
      <div className="flex space-x-2">
        <label className="form-control w-full ">
          <span className="label-text">Policy Number</span>
          <input
            type="text"
            name="policyNumber"
            placeholder="Type here"
            defaultValue={data?.policyNumber}
            className="input input-bordered"
          />
        </label>
        
      </div>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">License issue date</span>
          <input
            type="date"
            name="licenseIssueDate"
            placeholder="Type here"
            defaultValue={data?.licenseIssueDate}
            className="input input-bordered"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Driving license number</span>
          <input
            type="text"
            name="drivingLicenseNumber"
            placeholder="Type here"
            defaultValue={data?.drivingLicenseNumber}
            className="input input-bordered"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Car registration number</span>
          <input
            type="text"
            name="carRegistrationNumber"
            placeholder="Type here"
            defaultValue={data?.carRegistrationNumber}
            className="input input-bordered"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Registered keeper</span>
          <input
            type="text"
            name="registeredKeeper"
            placeholder="Type here"
            defaultValue={data?.registeredKeeper}
            className="input input-bordered"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Main driver</span>
          <input
            type="text"
            name="mainDriver"
            placeholder="Type here"
            defaultValue={data?.mainDriver}
            className="input input-bordered"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Vehicle usage type</span>
          <input
            type="text"
            name="vehicleUsageType"
            placeholder="Type here"
            defaultValue={data?.vehicleUsageType}
            className="input input-bordered"
          />
        </label>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="priorAccidentsLast5Years"
            placeholder="Type here"
            defaultChecked={!!data?.priorAccidentsLast5Years}
            className="checkbox checkbox-md"
          />
          <span className="label-text">Prior accidents in the last 5 years</span>
        </label>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="btn btn-secondary btn-link"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </form>
  )
}