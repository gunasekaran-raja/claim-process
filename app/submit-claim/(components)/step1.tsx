import Link from "next/link";
import { PersonalDetails } from "../(hooks)/useSubmissionData";

interface Step1Props {
  data?: PersonalDetails
  onNext: () => void
}

export default function Step1({ data, onNext }: Step1Props) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const personalDetails = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
        emailAddress: formData.get("emailAddress") as string,
        mobileNumber: formData.get("mobileNumber") as string,
        address: {
          address1: formData.get("address1") as string,
          address2: formData.get("address2") as string,
          city: formData.get("city") as string,
          postCode: formData.get("postCode") as string
        }
      }
      window.localStorage.setItem(
        "claimForm_personal", 
        JSON.stringify(personalDetails)
      )
    onNext()
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className=" text-lg font-semibold">Your Details</h2>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">First name</span>
          <input
            type="text"
            name="firstName"
            placeholder="Type here"
            defaultValue={data?.firstName}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Last name</span>
          <input
            type="text"
            name="lastName"
            placeholder="Type here"
            defaultValue={data?.lastName}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Date of birth</span>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Choose here"
            defaultValue={data?.dateOfBirth}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Email</span>
          <input
            type="email"
            name="emailAddress"
            placeholder="Type here"
            defaultValue={data?.emailAddress}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Phone</span>
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Type here"
            defaultValue={data?.mobileNumber}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Address Line 1</span>
          <input
            type="text"
            name="address1"
            placeholder="Type here"
            defaultValue={data?.address.address1}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Address Line 2</span>
          <input
            type="text"
            name="address2"
            placeholder="Type here"
            defaultValue={data?.address.address2}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <label className="form-control w-full max-w-xs">
          <span className="label-text">City</span>
          <input
            type="text"
            name="city"
            placeholder="Type here"
            defaultValue={data?.address.city}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <span className="label-text">Postal Code</span>
          <input
            type="text"
            name="postCode"
            placeholder="Type here"
            defaultValue={data?.address.postCode}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <div className=" flex justify-end">
        <Link href={'/'}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </form>
  )
}