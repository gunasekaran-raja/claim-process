"use client";

import React, { useEffect, useState } from "react";
import { ClaimItem } from "../(hooks)/useClaimsList";
import { Check, HeadCircuit, House, MinusCircle, NotePencil, PlusCircle, X } from "@phosphor-icons/react";
import Link from "next/link";

export default function Claims() {

  const [currentList, setCurrentList] = useState<ClaimItem[]>() 
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem>()


  useEffect(() => {
    setCurrentList(JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    ))
  }, [])

  const handleExpand = (item: ClaimItem) => {

    const currentList: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    )

    const processedData = currentList?.find((pItem) => pItem.claimNumber === item.claimNumber)

    setSelectedClaim({
      ...item,
      ...(processedData || {})
    })
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
                {currentList.map((claimItem, i) =>
                  <React.Fragment key={i}>
                    <tr key={i}
                      className={
                        selectedClaim?.claimNumber === claimItem.claimNumber ? " bg-base-200 border-b-0" :
                          ""
                      } >
                      <th>{claimItem.claimNumber}</th>
                      <td>{new Date(claimItem.claimDate).toLocaleDateString()}</td>
                      <td>{new Date(claimItem.incidentDate).toLocaleDateString()}</td>
                      <td>{claimItem.incidentDetail}</td>
                      <td>{claimItem.firstName} {claimItem.lastName} </td>
                      <td>{claimItem.accessorNotes || "-"} </td>
                      <td className="flex justify-center">
                        {claimItem.dataOS.confidence > 80 ?
                          claimItem.dataOS.suggest === "approve" ?
                            <span className="btn btn-sm btn-primary btn-outline">Approve</span> :
                            claimItem.dataOS.suggest === "reject" ?
                              <span className=" underline text-error ">Reject</span> : null :
                          <span className=" italic">Undecided</span>
                        }
                      </td>
                      <td className=" text-center"> {claimItem.dataOS.confidence} </td>
                      <td className=" flex space-x-2 items-center">
                        <span className=" cursor-pointer text-xl">
                          {selectedClaim?.claimNumber === claimItem.claimNumber ?
                            <MinusCircle
                              onClick={() => setSelectedClaim(undefined)}
                              size={24}
                            /> :
                            <PlusCircle
                              onClick={() => handleExpand(claimItem)}
                              size={24}
                            />
                          }
                        </span>
                      </td>

                    </tr>
                    {selectedClaim?.claimNumber === claimItem.claimNumber &&
                      <tr key={`detail_${i}`} className="border-t-0 bg-base-300">
                        <td colSpan={9}>
                          <div className=" p-6 flex space-x-4 w-full items-start">
                            <div className="w-3/12">
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
                            <div className=" w-3/12">
                              <label className="form-control w-full">
                                <span className=" label-text text-2xl flex items-center mb-4">
                                  <NotePencil className=" mr-2" size={28} /> Forward Notes
                                </span>
                                <textarea
                                  readOnly={!!selectedClaim.status}
                                  onChange={(e) => setSelectedClaim({
                                    ...selectedClaim,
                                    accessorNotes: e.target.value
                                  })}
                                  value={selectedClaim.accessorNotes}
                                  placeholder="Enter your notes here"
                                  className={`w-full h-32 bg-base-200 textarea-bordered textarea`}
                                />
                              </label>
                            </div>

                            <div className=" w-3/12">
                              <label className="form-control w-full">
                                <span className=" label-text text-2xl flex items-center mb-4">
                                  <NotePencil className=" mr-2" size={28} /> Underwriter&apos;s Notes
                                </span>
                                <textarea                                 
                                  placeholder="Enter your notes here"
                                  className={`w-full h-32 bg-base-200 textarea-bordered textarea`}
                                />
                              </label>
                            </div>

                            <div className=" w-3/12 space-y-2 flex-col flex mt-12">
                              <button
                                className="btn btn-sm btn-outline btn-primary">
                                <Check /> Accept
                              </button>
                              <button
                                className="btn btn-sm btn-outline btn-error mb-8">
                                <X />  Reject
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>}
                  </React.Fragment>

                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}
