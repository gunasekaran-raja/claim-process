import { useEffect, useState } from "react";

export const DEFAULT_SUBMISSION_URL = "https://gist.githubusercontent.com/khushi11112002/c21baaf03ef376cd829f177cd399139f/raw/claims_prediction_data.json"

export interface ClaimItem {
  "claimNumber": number,
  "firstName": string,
  "lastName": string,
  "incidentDetail": string,
  "incidentDate": string,
  "claimDate": string,
  "accessorNotes"?: string,
  "status"?: "approved" | "rejected" | "forwarded",
  "dataOS": {
    "suggest": "approve" | "reject",
    "confidence": number
    "llmReasoning": string
    "additionalNote": string
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