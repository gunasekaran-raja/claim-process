import Link from "next/link";

export default async function Home() {

  // const listRes = await fetch("https://gist.githubusercontent.com/gunasekaran-raja/e83cf2b5b47e4360ec636fd7d66da527/raw/9795182b91bd125f61c68065674791b80dc9d635/claims-demo.json")
  // const list = await listRes.json()
  
  // console.log(JSON.stringify(list))
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Fast, Hassle-Free Claims. Anytime, Anywhere.</h1>
          <p className="py-6">
            Submit. Track. Get Approved with Accuracy. <br />
            AI-powered claim processing app ensures quick approvals, real-time tracking, and unmatched accuracy—all in just a few taps.
          </p>
          <div className=" space-x-4 flex justify-center items-center">
            <Link href={'/submit-claim'}>
              <button className="btn btn-secondary btn-outline">Submit a Claim</button>
            </Link>
            <Link href={'/claims'}>
              <button className="btn btn-primary">Continue as Adjuster</button>
            </Link>
            <Link href={'/claims/forwards'}>
              <button className="btn btn-outline">Continue as Underwriter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
