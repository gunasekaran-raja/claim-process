import { useEffect, useState } from "react";

export const DEFAULT_SUBMISSION_URL = "https://gist.githubusercontent.com/gunasekaran-raja/e83cf2b5b47e4360ec636fd7d66da527/raw/claims-demo.json"

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
  }

}

export default function useClaimsList() {

  const [ storedData, setStoredData ] = useState<ClaimItem[] | null>(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    
    const localData: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("claimList") || "null"
    )

    if(localData) {
      setStoredData(localData.sort((a, b) => b.claimNumber - a.claimNumber))
    } else {
      setLoading(true)
      fetch(DEFAULT_SUBMISSION_URL)
        .then((res) => res.json())
        .then((data: ClaimItem[]) => {
          const sortedData = data.sort((a, b) => b.claimNumber - a.claimNumber)
          setStoredData(sortedData)
          window.localStorage.setItem(
            "claimList", 
            JSON.stringify(sortedData)
          )
          setLoading(false)
        }
      )
    }
  }, [])


  return {
    storedData, loading
  }
}