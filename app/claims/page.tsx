"use client";

import React, { useState } from "react";
import useClaimsList from "./(hooks)/useClaimsList";
import { HeadCircuit, House, MinusCircle, NotePencil, PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";

export default function Claims() {

  const { storedData } = useClaimsList()
  const [ selectedClaim, setSelectedClaim ] = useState<number>()

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
                    <tr key={i} 
                      className={
                        selectedClaim === claimItem.claimNumber ? " bg-base-200 border-b-0" : 
                        ""
                      } >
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
                     <tr key={`detail_${i}`} className="border-t-0 bg-base-300">
                      <td colSpan={9}>
                        <div className=" p-6 flex space-x-4 w-full items-end">
                          <div className="w-5/12">
                            <h2 className=" text-2xl flex items-center mb-4">
                              <HeadCircuit className=" mr-2" size={28} /> Reasoning
                            </h2>
                            <div className=" space-y-4">
                              <div className="alert">
                                <span>
                                  The AI model has identified inconsistencies in the provided incident details and the reported incident date, suggesting potential inaccuracies in the claim.
                                </span>
                              </div>
                              <div className="alert">
                                <span>
                                  The claim amount exceeds the policy coverage limits, indicating that the claim cannot be fully honored as per the policy terms.
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className=" w-5/12">
                            <h2 className=" text-2xl flex items-center mb-4">
                              <NotePencil className=" mr-2" size={28} /> Underwriter&apos;s Notes
                            </h2>
                            <div >
                              <textarea className="w-full h-32 bg-base-200 textarea-bordered textarea" />
                            </div>
                          </div>
                          <div className=" w-2/12 space-y-2 flex-col flex">
                            <button className="btn btn-sm btn-outline btn-primary">Accept</button>
                            <button className="btn btn-sm btn-outline btn-error">Reject</button>

                          </div>
                        </div>
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
