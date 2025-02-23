"use client";

import React, { useState } from "react";
import useClaimsList from "./(hooks)/useClaimsList";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";

export default function Claims() {

  const { storedData } = useClaimsList()
  const [ selectedClaim, setSelectedClaim ] = useState<number>()

  return (
    <div>
      <header className="bg-primary">
        <div className=" max-w-screen-xl mx-auto py-6">
          <Link href="/">
            <h1 className=" text-4xl font-semibold text-primary-content">Claims Queue</h1>
          </Link>
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto">
        <div className=" my-4 breadcrumbs text-sm">
          <ul>
            <li><a>Customer Central</a></li>
            <li><a>Claims</a></li>
            <li>All</li>
          </ul>
        </div>
        { !storedData && <p> No items available </p> }
        { storedData &&
          <div className="overflow-x-auto">
            <table className="table border rounded-lg">
              {/* head */}
              <thead>
                <tr>
                  <th>Claim number</th>
                  <th>Claim date</th>
                  <th>Incident date</th>
                  <th>Incident detail</th>
                  <th>Name</th>
                  <th>Accessor Notes</th>
                  <th className=" text-center"> Suggestion </th>
                  <th className=" text-center"> Score </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { storedData.map((claimItem, i) => 
                  <React.Fragment key={i}>
                    <tr key={i} className={selectedClaim === claimItem.claimNumber ? " shadow-inner border-b-0" : ""} >
                      <th>{ claimItem.claimNumber }</th>
                      <td>{ new Date(claimItem.claimDate).toLocaleDateString() }</td>
                      <td>{ new Date(claimItem.incidentDate).toLocaleDateString() }</td>
                      <td>{ claimItem.incidentDetail }</td>
                      <td>{ claimItem.firstName } { claimItem.lastName } </td>
                      <td>{ claimItem.accessorNotes || "-" } </td>
                      <td className="flex justify-center">
                        { claimItem.dataOS.confidence > 80 ? 
                          claimItem.dataOS.suggest === "approve" ?
                          <span className="btn btn-sm btn-primary btn-outline">Approve</span> :
                          claimItem.dataOS.suggest === "reject" ?
                          <span className=" underline text-error ">Reject</span> : null :
                          <span className=" italic">Undecided</span>
                        } 
                      </td>
                      <td className=" text-center"> {claimItem.dataOS.confidence} </td>
                      <td className=" flex space-x-2 items-center"> 
                        <span 
                          onClick={() => {
                            if(selectedClaim === claimItem.claimNumber)
                              setSelectedClaim(undefined)
                            else
                              setSelectedClaim(claimItem.claimNumber)
                          }}
                          className=" cursor-pointer text-xl"
                        >
                          { selectedClaim === claimItem.claimNumber ? 
                            <MinusCircle size={24} /> :
                            <PlusCircle size={24} />
                          }
                        </span>
                      </td>

                    </tr>
                    { selectedClaim === claimItem.claimNumber &&
                     <tr key={`detail_${i}`} className="border-t-0">
                      <td colSpan={9}>
                        Lohrem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
                        magna nec libero ultricies tincidunt. Nullam nec magna nec libero
                      </td>
                    </tr>}
                  </React.Fragment>
                  
                ) }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}
