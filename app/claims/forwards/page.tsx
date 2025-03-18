"use client";

import React, { useEffect, useState } from "react";
import { ClaimItem } from "../(hooks)/useClaimsList";
import { House } from "@phosphor-icons/react";
import Link from "next/link";
import ClaimsTable, { HandleActionProps } from "../(components)/ClaimTable";

export default function Claims() {

  const [currentList, setCurrentList] = useState<ClaimItem[]>()


  useEffect(() => {
    const list: ClaimItem[] | null = JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    )
    setCurrentList(
      list?.filter((item) => item.status === "forwarded")
    )
  }, [])

  const handleAction = ({ status, item: selectedClaim }: HandleActionProps ) => {

    const currentList: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    )
    const item = currentList.find((pItem) =>
      pItem.claimNumber === selectedClaim!.claimNumber
    )

    if (!currentList || !item) return false

    const concent = window.confirm(`You're about to ${status === "approved" ? "approve" :
      status === "rejected" ? "reject" :
        "forward"
      } claim number #${selectedClaim!.claimNumber}. Please confirm!`)

    if (!concent) return false

    item.underWriterStatus = status as "approved" | "rejected"
    
    if(item.underWriterNotes) {
      item.underWriterNotes = selectedClaim.underWriterNotes
    }

    window.localStorage.setItem(
      "processedClaimList",
      JSON.stringify(currentList)
    )

    return item
  }

  return (
    <div>
      <header className="bg-primary">
        <div className=" max-w-screen-xl mx-auto py-6">
          <Link href="/">
            <h1 className=" flex space-x-4 items-center text-4xl font-semibold text-primary-content">
              <House size={32} />
              <span>Claims Queue</span>
            </h1>
          </Link>
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto">
        <div className=" my-4 breadcrumbs text-sm">
          <ul>
            <li><a>Customer Central</a></li>
            <li><a>Claims</a></li>
            <li className=" text-primary">Forwards</li>
          </ul>
        </div>
        {!currentList || currentList.length === 0 ? <p> No items available </p> :
          <ClaimsTable
            data={currentList}
            mode="underwriter"
            onAction={handleAction}
          />
        }
      </div>
    </div>
  );
}
