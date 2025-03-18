"use client";

import React from "react";
import useClaimsList from "./(hooks)/useClaimsList";
import { House, Info } from "@phosphor-icons/react";
import Link from "next/link";
import ClaimsTable, { HandleActionProps } from "./(components)/ClaimTable";

export default function Claims() {

  const { storedData, loading } = useClaimsList()



  const handleAction = ({ status, item: selectedClaim }: HandleActionProps) => {
    
    const concent = window.confirm(`You're about to ${
      status === "approved" ? "approve" :
      status === "rejected" ? "reject" :
      "forward"
    } claim number #${selectedClaim!.claimNumber}. Please confirm!`)


  if(!concent) return false

    const currentList = JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    )

    const claimData = {
      ...selectedClaim!,
      status
    }
    window.localStorage.setItem(
      "processedClaimList",
      JSON.stringify([
        claimData,
        ...(currentList || [])
      ])
    )

    return claimData
  }

  if(loading) {
    return(
      <div className=" flex w-full h-screen justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
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

      <div role="alert" className="alert alert-warning my-4">
        <Info size={24} />
        <span><b> High Claim Alert: </b> Increased claims reported for postalcode SW1A 1AA.</span>
      </div>

        <div className=" my-4 breadcrumbs text-sm">
          <ul>
            <li><a>Customer Central</a></li>
            <li><a>Claims</a></li>
            <li>All</li>
          </ul>
        </div>
        {!storedData && <p> No items available </p>}
        <ClaimsTable
          data={storedData || []}
          onAction={handleAction}
          mode="accessor"
        />
      </div>
    </div>
  );
}
