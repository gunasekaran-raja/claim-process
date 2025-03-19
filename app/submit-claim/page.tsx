"use client";

import { useState } from "react";
import Step1 from "./(components)/step1";
import useSubmissionData from "./(hooks)/useSubmissionData";
import Step2 from "./(components)/step2";
import Step3 from "./(components)/step3";
import Step4 from "./(components)/step4";
import Link from "next/link";
import { House, HouseLine } from "@phosphor-icons/react";
import MOCK from "./(hooks)/mock-data.json"

export default function SubmitClaim() {

  const [ step, setStep ] = useState(1)
  const { storedData } = useSubmissionData()

  const [ claimNumber, setClaimNumber ] = useState<string>()
  
  const handleSumbit = () => {

    if(!storedData) return false

    const currentList = JSON.parse(
      window.localStorage.getItem("submittedClaimList") || "null"
    )

    const newClaimNumber = currentList ? currentList[0].claimNumber + 1 : 20001
    const dataOS = MOCK[Math.floor(Math.random() * 100)]
    const payload = {
      claimNumber: newClaimNumber,
      "firstName": storedData.personal!.firstName,
      "lastName": storedData.personal!.lastName,
      "incidentDetail": storedData.claim!.incidentCause,
      "incidentDate": storedData.claim!.incidentDate,
      "claimDate": storedData.claim!.claimDate,
      "accessorNotes": "",
      "dataOS": dataOS,
      full_details: {
        "claimNumber": newClaimNumber,
        "firstName": storedData.personal!.firstName,
        "lastName": storedData.personal!.lastName,
        "incidentDate": storedData.claim!.incidentDate,
        "claimDate": storedData.claim!.claimDate,
        "accessorNotes": "",
        "vehicle_registration_number": storedData.policy!.carRegistrationNumber,
        "policy_id": storedData.policy!.policyNumber,
        "policy_issue_date": storedData.policy!.licenseIssueDate,
        "dataOS": dataOS,
        "postal_code": storedData.personal!.address.postCode,
        "driving_licence_number": storedData.policy!.drivingLicenseNumber
      }
    }

    window.localStorage.setItem(
      "submittedClaimList", 
      JSON.stringify([payload, ...(currentList || [])])
    )

    setClaimNumber("C"+newClaimNumber)
  }

  if(claimNumber){
    return(
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Claim Number: {claimNumber}
            </h1>
            <p className="py-6">
              Thank you for submitting your claim. <br />
              We will notify you once the claim is processed.
            </p>
            <div className=" space-x-4 flex items-center justify-center w-full">
              <Link href={'/'} >
                <button className="btn btn-outline">
                  <HouseLine /> Home
                </button>
              </Link>
              <Link href={'/'} >
                <button className="btn btn-primary">Learn More</button>
              </Link>

              
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="bg-primary">
        <div className=" mx-auto space-x-4 px-4 py-6">
          <h1 className=" flex justify-center items-center space-x-4 text-4xl font-semibold text-primary-content">
            <Link href={"/"}>
              <House size={32} />
            </Link>
            <span>
              Motor Claim Submission
            </span>
          </h1>
        </div>
      </header>
      <div className=" my-8 flex justify-center items-center">
        <ul className="steps">
          <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Personal</li>
          <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Policy</li>
          <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Claim</li>
          <li className={`step ${step === 4 ? "step-primary" : ""}`}>Review & Submit</li>
        </ul>
      </div>
      <div className="my-8 max-w-xl mx-auto px-4 space-y-4">
        <p>Please check your details before submitting the form.</p>
        { step === 1 && <Step1 data={storedData?.personal} onNext={() => setStep(2)} />}
        { step === 2 && 
          <Step2 
            data={storedData?.policy} 
            onNext={() => setStep(3)} 
            onBack={() => setStep(1)}
          />}
        { step === 3 && 
          <Step3 
            data={storedData?.claim} 
            onNext={() => setStep(4)} 
            onBack={() => setStep(2)}
          />}
        { step === 4 && 
          <Step4 
            onBack={() => setStep(3)}
            onSubmit={handleSumbit}
          />
        }
      </div>
    </div>
  );
}
