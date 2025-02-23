import { useState } from "react";
import useSubmissionData from "../(hooks)/useSubmissionData";

interface Step4Props {
  onBack: () => void
  onSubmit: () => void
}

export default function Step4({onBack, onSubmit}: Step4Props) {
  const { storedData } = useSubmissionData()
  const [concentAccuracy, setConcentAccuracy] = useState(false)

  if(!storedData) return null

  return(
    <div>
      <h2 className=" text-2xl font-semibold mb-4">Your Details</h2>
      <ul className="space-y-2 mb-8">
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">First name</span>
          <span>{ storedData?.personal?.firstName }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Last name</span>
          <span>{ storedData?.personal?.lastName }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Email Address</span>
          <span>{ storedData?.personal?.emailAddress }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Phone number</span>
          <span>{ storedData?.personal?.mobileNumber }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Date of birth</span>
          <span>{ storedData?.personal?.dateOfBirth }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Address</span>
          <span>{ Object.values(storedData!.personal!.address).join("\n ") }</span>
        </li>
      </ul>
      <h2 className=" text-2xl font-semibold mb-4">Policy Details</h2>
      <ul className="space-y-2 mb-8" >
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Policy Number</span>
          <span>{ storedData?.policy?.policyNumber }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">License issue date</span>
          <span>{ storedData?.policy?.licenseIssueDate }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Driving license number</span>
          <span>{ storedData?.policy?.drivingLicenseNumber }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Car registration number</span>
          <span>{ storedData?.policy?.carRegistrationNumber }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Registered keeper</span>
          <span>{ storedData?.policy?.registeredKeeper }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Prior accidents in the last 5 years</span>
          <span>{ storedData?.policy?.priorAccidentsLast5Years ? "Yes" : "No" }</span>
        </li>


      </ul>
      <h2 className=" text-2xl font-semibold mb-4">Claim Details</h2>
      <ul className="space-y-2 mb-8" >
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Claim Date</span>
          <span>{ storedData?.claim?.claimDate }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Incident Date</span>
          <span>{ storedData?.claim?.incidentDate }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Damage Type</span>
          <span>{ storedData?.claim?.damageType }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Claim Type</span>
          <span>{ storedData?.claim?.claimType }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Incident Cause</span>
          <span>{ storedData?.claim?.incidentCause }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold">Third Party Involved</span>
          <span>{ storedData?.claim?.thirdPartyInvolved }</span>
        </li>
        <li className="flex space-x-4">
          <span className=" w-full max-w-52 font-semibold"> Additional notes</span>
          <span>{ storedData?.claim?.additionalNotes }</span>
        </li>
      </ul>

      <div>
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="concentAccuracy"
            checked={concentAccuracy}
            onChange={() => setConcentAccuracy(!concentAccuracy)}
            className="checkbox checkbox-md"
          />
          <span className="label-text">
            I confirm that the information provided is accurate
          </span>
        </label>
        <div className="flex mt-4 justify-between items-center">
          <button
            type="button"
            className="btn btn-secondary btn-link"
            onClick={onBack}
          >
            Back
          </button>
          <button onClick={onSubmit} disabled={!concentAccuracy} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  )
}