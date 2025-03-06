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
    
    const localData: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("claimList") || "null"
    )

    fetch(DEFAULT_SUBMISSION_URL)
      .then((res) => res.json())
      .then((data: ClaimItem[]) => {
        const sortedData = data
        setStoredData(sortedData)
        window.localStorage.setItem(
          "claimList", 
          JSON.stringify(sortedData)
        )
        setLoading(false)
      }
    ).catch(() => {
      if(localData) {
        setStoredData(localData)
      }
    })

  }, [])


  return {
    storedData, loading
  }
}