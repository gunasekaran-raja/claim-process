import { useEffect, useState } from "react";

export const DEFAULT_SUBMISSION_URL = "https://gist.githubusercontent.com/gunasekaran-raja/e83cf2b5b47e4360ec636fd7d66da527/raw/claim-submission.json"

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  address: {
    address1: string;
    address2?: string;
    city: string;
    postCode: string;
  };
  mobileNumber: string;
  emailAddress: string;
}

export interface PolicyDetails {
  policyNumber: string;
  licenseIssueDate: string; // Format: YYYY-MM-DD
  drivingLicenseNumber: string;
  priorAccidentsLast5Years: number;
  carRegistrationNumber: string;
  registeredKeeper: string;
  mainDriver: string;
  vehicleUsageType: string;
}

export interface ClaimDetails {
  claimDate: string; // Format: YYYY-MM-DD
  incidentDate: string; // Format: YYYY-MM-DD
  incidentCause: string;
  claimType: string;
  thirdPartyInvolved: boolean;
  damageType: string;
  attachments: string[]; // Array of file names or URLs
  additionalNotes: string;
}

interface InsuranceClaim {
  personal?: PersonalDetails;
  policy?: PolicyDetails;
  claim?: ClaimDetails;
}


export default function useSubmissionData() {

  const [ storedData, setStoredData ] = useState<InsuranceClaim | null>(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    
    const personal = JSON.parse(
      window.localStorage.getItem("claimForm_personal") || "null"
    )
    const policy = JSON.parse(
      window.localStorage.getItem("claimForm_policy") || "null"
    )
    const claim = JSON.parse(
      window.localStorage.getItem("claimForm_claim") || "null"
    )

    if(personal && policy && claim) {
      setStoredData({ personal, policy, claim })
    } else {
      setLoading(true)
      fetch(DEFAULT_SUBMISSION_URL)
        .then((res) => res.json())
        .then((data) => {
          setStoredData(data)
          window.localStorage.setItem("claimForm_personal", JSON.stringify(data?.personal))
          window.localStorage.setItem("claimForm_policy", JSON.stringify(data?.policy))
          window.localStorage.setItem("claimForm_claim", JSON.stringify(data?.claim))
          setLoading(false)
        }
      )
    }
  }, [])


  return {
    storedData, loading
  }
}