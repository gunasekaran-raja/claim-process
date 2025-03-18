import React, { useEffect, useState } from "react";
import { ClaimItem } from "../(hooks)/useClaimsList";
import { ArrowBendUpRight, Check, HeadCircuit, MinusCircle, NotePencil, PlusCircle, X } from "@phosphor-icons/react";

type ClaimTableProps = {
  data: ClaimItem[]
  mode: "accessor" | "underwriter"
  onAction: (props: HandleActionProps) => ClaimItem | false
}

export type HandleActionProps = {
  status: "approved" | "rejected" | "forwarded"
  item: ClaimItem
}

export default function ClaimsTable({
  data, onAction, mode
}: ClaimTableProps) {

  const [ claimList, setClaimList ] = useState<ClaimItem[]>(data)
  const [selectedClaim, setSelectedClaim] = useState<ClaimItem>()
  const [notesError, setNotesError] = useState(false)

  const handleAction = (props: HandleActionProps) => {

    if (props.status === "forwarded" && !selectedClaim?.accessorNotes) {
      setNotesError(true)
      return false
    }

    const result = onAction(props)
    if (result) {
      setSelectedClaim(result)
      updateDecisions()
    }
  }

  function updateDecisions() {

    if(mode === "underwriter") return

    const processed: ClaimItem[] = JSON.parse(
      window.localStorage.getItem("processedClaimList") || "null"
    )
    if(!processed) return

    const updatedList = claimList.map((item) => {
      const processedData = processed.find((pItem) => pItem.claimNumber === item.claimNumber)
      return {
        ...item,
        ...processedData
      }
    })

    setClaimList(updatedList)

  }


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


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateDecisions, [])

  const Decision = (({ status }: { status: "approved" | "rejected" | "forwarded" | "pending" }) => 
    <span className={
      status === "approved" ? "text-green-600" :
      status === "rejected" ? "text-red-500" :
      status === "forwarded" ? "text-blue-500" : " text-gray-500"
    }>{status}</span>
  )

  return (
    <div className="overflow-x-auto">
      <table className="table border rounded-lg">
        {/* head */}
        <thead>
          <tr>
            <th>Claim number</th>
            <th>Claim date</th>
            <th>Incident date</th>
            <th>Name</th>
            <th className=" text-center"> Recommendation </th>
            <th className=" text-center"> ML Score </th>
            <th className=" text-center"> LLM Score </th>
            <th className=" text-center"> Decision </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {claimList.map((claimItem, i) =>
            <React.Fragment key={i}>
              <tr key={i}
                className={
                  selectedClaim?.claimNumber === claimItem.claimNumber ? " bg-base-200 border-b-0" :
                    ""
                } >
                <th>{claimItem.claimNumber}</th>
                <td>{new Date(claimItem.claimDate).toLocaleDateString()}</td>
                <td>{new Date(claimItem.incidentDate).toLocaleDateString()}</td>
                <td>{claimItem.firstName} {claimItem.lastName} </td>
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
                <td className=" text-center"> {claimItem.dataOS.confidence} </td>
                <td className=" text-center capitalize"> {
                  <Decision status={claimItem.underWriterStatus || claimItem.status || "pending"} />
                } </td>
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
                  <td colSpan={10}>
                    <div className=" p-6 flex space-x-4 w-full items-start">
                      <div className={
                        mode === "underwriter" || selectedClaim.underWriterNotes ? "w-4/12" : "w-6/12"
                      }>
                        <h2 className=" text-2xl flex items-center mb-4">
                          <HeadCircuit className=" mr-2" size={28} /> Reasoning
                          <span className="btn btn-link text-right">Learn more </span>
                        </h2>
                        <div className=" space-y-4">
                          <div className="alert">
                            <span>
                              {claimItem.dataOS.llmReasoning}
                            </span>
                          </div>
                          <div className="alert">
                            <span>
                              {claimItem.dataOS.additionalNote}
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
                            className={`w-full h-48 bg-base-200 textarea-bordered textarea`}
                          />
                          {notesError && <p className="text-error"> Notes cannot be empty </p>}
                        </label>
                        <span className="btn btn-link">View full details </span>
                      </div>

                      {(mode === "underwriter" || selectedClaim.underWriterNotes) && <div className=" w-3/12">
                        <label className="form-control w-full">
                          <span className=" label-text text-2xl flex items-center mb-4">
                            <NotePencil className=" mr-2" size={28} /> Underwriter&apos;s Notes
                          </span>
                          <textarea
                            readOnly={!!selectedClaim.underWriterStatus}
                            onChange={(e) => setSelectedClaim({
                              ...selectedClaim,
                              underWriterNotes: e.target.value
                            })}
                            value={selectedClaim.underWriterNotes}
                            placeholder="Enter your notes here"
                            className={`w-full h-48 bg-base-200 textarea-bordered textarea`}
                          />
                        </label>
                      </div>}

                      <div className=" w-2/12 space-y-2 flex-col flex mt-12">

                        { selectedClaim.status && 
                          <StatusText status={selectedClaim.status} labelText="Adjuster Status" /> }
                        { selectedClaim.underWriterStatus && 
                          <StatusText status={selectedClaim.underWriterStatus} labelText="Underwriter Status" />
                        }
                        <button
                          disabled={
                            ( mode === "accessor" && !!selectedClaim.status ) ||
                            ( mode === "underwriter" && !!selectedClaim.underWriterStatus )
                          }
                          onClick={() => handleAction({
                            status: "approved",
                            item: selectedClaim
                          })}
                          className="btn btn-sm btn-outline btn-primary">
                          <Check /> Accept
                        </button>
                        <button
                          disabled={
                            ( mode === "accessor" && !!selectedClaim.status ) ||
                            ( mode === "underwriter" && !!selectedClaim.underWriterStatus )
                          }
                          onClick={() => handleAction({
                            status: "rejected",
                            item: selectedClaim
                          })}
                          className="btn btn-sm btn-outline btn-error mb-8">
                          <X />  Reject
                        </button>
                        {mode === "accessor" && 
                          <button
                            disabled={!!selectedClaim.status}
                            onClick={() => handleAction({
                              status: "forwarded",
                              item: selectedClaim
                            })}
                            className="btn btn-sm btn-outline mt-8"
                          >
                            <ArrowBendUpRight /> Forward
                          </button>
                        }
                      </div>
                    </div>
                  </td>
                </tr>}
            </React.Fragment>

          )}
        </tbody>
      </table>
    </div>

  );
}

function StatusText({
  status, labelText
}: { status: "approved" | "rejected" | "forwarded", labelText?: string }) {
  return (
    <p>
      {labelText && <b>{labelText}: </b>}
      <span
        className={" mt-0 font-bold capitalize text-2xl " +
          (status === "approved" ? " text-green-600 " :
            status === "rejected" ? "text-red-500" : "text-blue-500"
          )}
      >
        {status}!
      </span>
    </p>
  )
}