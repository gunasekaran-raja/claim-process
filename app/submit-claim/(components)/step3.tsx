import { ClaimDetails } from "../(hooks)/useSubmissionData"

interface Step3Props {
  data?: ClaimDetails
  onNext: () => void
  onBack: () => void
}

export default function Step3({ data, onNext, onBack }: Step3Props) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const claimDetails = {
      claimDate: formData.get("claimDate") as string,
      incidentDate: formData.get("incidentDate") as string,
      incidentCause: formData.get("incidentCause") as string,
      claimType: formData.get("claimType") as string,
      thirdPartyInvolved: !!formData.get("thirdPartyInvolved"),
      damageType: formData.get("damageType") as string,
      attachments: [],
      additionalNotes: formData.get("additionalNotes") as string
    }
    window.localStorage.setItem(
      "claimForm_claim",
      JSON.stringify(claimDetails)
    )
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className=" text-lg font-semibold">Claim Details</h2>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Claim Date</span>
          <input
            type="date"
            name="claimDate"
            placeholder="Type here"
            defaultValue={data?.claimDate}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Incident Date</span>
          <input
            type="text"
            name="incidentDate"
            placeholder="Type here"
            defaultValue={data?.incidentDate}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <label className="form-control   w-full max-w-xs">
          <span className="label-text">Damage Type</span>
          <input
            type="text"
            name="damageType"
            placeholder="Type here"
            defaultValue={data?.damageType}
            className="input input-bordered"
          />
        </label>
        
        <label className="form-control   w-full max-w-xs">
          <span className="label-text">Claim Type</span>
          <select defaultValue={data?.claimType} name="claimType" className="select select-bordered  w-full max-w-xs">
            <option value="Comprehensive">Comprehensive</option>
            <option value="Theft">Theft</option>
            <option value="Vandalism">Vandalism</option>
          </select>
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Incident Cause</span>
          <input
            type="text"
            name="incidentCause"
            placeholder="Type here"
            defaultValue={data?.incidentCause}
            className="input input-bordered  w-full max-w-xs"
          />
        </label>
      </div>
      <div className="flex space-x-2">
       
        <div className="form-control   w-full max-w-xs">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              name="thirdPartyInvolved"
              placeholder="Type here"
              defaultChecked={!!data?.thirdPartyInvolved}
              className="checkbox checkbox-md"
            />
            <span className="label-text">Third Party Involved</span>
          </label>
        </div>
        
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Additional Notes</span>
          <textarea 
            defaultValue={data?.additionalNotes} 
            className="textarea textarea-bordered w-full max-w-xs" 
            rows={3}
            name="additionalNotes"
          />
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