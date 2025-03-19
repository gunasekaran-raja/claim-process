import { useEffect, useState } from "react";

export const DEFAULT_SUBMISSION_URL = "https://gist.githubusercontent.com/khushi11112002/f1c20051d7ed55035cf12adf35f144eb/raw/claims_prediction_3.json"

export interface ClaimItem {
  "claimNumber": number,
  "firstName": string,
  "lastName": string,
  "incidentDetail": string,
  "incidentDate": string,
  "claimDate": string,
  "accessorNotes"?: string,
  "underWriterNotes"?: string,
  "underWriterStatus"?: "approved" | "rejected",
  "status"?: "approved" | "rejected" | "forwarded",
  "dataOS": {
    "suggest": "approve" | "reject",
    "confidence": number
    "llmReasoning": string
    "additionalNote": string
  }
  full_details: {
    claimNumber: string
    firstName: string
    lastName: string
    incidentDate: string
    claimDate: string
    accessorNotes: string
    vehicle_registration_number: string
    policy_id: string
    policy_issue_date: string
    dataOS: {
      suggest: string
      confidence: number
      llmReasoning: string
      additionalNote: string
    }
    postal_code: string
    driving_licence_number: string
  }
}

export default function useClaimsList() {

  const [ storedData, setStoredData ] = useState<ClaimItem[] | null>(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    
    setLoading(true)
    
    const localData: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("claimList") || "null"
    )

    const submittedList: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("submittedClaimList") || "null"
    )?.map((item: ClaimItem) => ({
      ...item,
      claimNumber: `C${item.claimNumber}`
    }))

    fetch(DEFAULT_SUBMISSION_URL)
      .then((res) => res.json())
      .then((data: ClaimItem[]) => {
        setStoredData([...(submittedList || []), ...data])
        window.localStorage.setItem(
          "claimList", 
          JSON.stringify(data)
        )
        setLoading(false)
      }
    ).catch(() => {
      if(localData) {
        setStoredData(localData)
      }
      setLoading(false)
    })
  }, [])

  return {
    storedData, loading
  }
}