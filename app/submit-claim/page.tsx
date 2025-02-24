"use client";

import { useState } from "react";
import Step1 from "./(components)/step1";
import useSubmissionData from "./(hooks)/useSubmissionData";
import Step2 from "./(components)/step2";
import Step3 from "./(components)/step3";
import Step4 from "./(components)/step4";
import useClaimsList from "../claims/(hooks)/useClaimsList";
import Link from "next/link";
import { House } from "@phosphor-icons/react";

export default function SubmitClaim() {

  const [ step, setStep ] = useState(1)
  const { storedData } = useSubmissionData()
  const { storedData: claimList } = useClaimsList()

  const [ claimNumber, setClaimNumber ] = useState<number>()
  
  const handleSumbit = () => {

    if(!storedData) return false

    const newClaimNumber = claimList ? claimList[0].claimNumber + 1 : 10001

    const payload = {
      claimNumber: newClaimNumber,
      "firstName": storedData.personal!.firstName,
      "lastName": storedData.personal!.lastName,
      "incidentDetail": storedData.claim!.incidentCause,
      "incidentDate": storedData.claim!.incidentDate,
      "claimDate": storedData.claim!.claimDate,
      "accessorNotes": "",
      "dataOS": {
        "suggest": Math.round(Math.random()) ? "approve" : "reject",
        "confidence": Math.round(Math.random() * 100)
      }
    }

    window.localStorage.setItem(
      "claimList", 
      JSON.stringify([...(claimList || []), payload])
    )

    setClaimNumber(newClaimNumber)
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
            <div className=" space-x-4">
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
