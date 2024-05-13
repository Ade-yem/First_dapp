import React, { useState } from "react"
import { ethers } from "ethers";
import toast from "react-hot-toast"

type SearchProps = {
  title: "doctor" | "hospital" | "patient";
  handleData: (state: any) => void;
}

export const Search: React.FC<SearchProps> = ({ title, handleData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [hidden, setHidden] = useState<boolean>(true)
  const [query, setQuery] = useState<string>("")
  
  const search = async () => {
    // search for the query
    setHidden(false)
    setLoading(true)
    const res = ethers.utils.isAddress(query)
    if (res) {
      toast.success("Address valid", {id: "address"})
      setResult({address: query})
    } else toast.error("Address invalid", {id: "address"})
    setLoading(false)
    
  }
  const getData = () => {
    setHidden(true)
    handleData(result)
    setQuery("")
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center mt-5 gap-2 max-w-[450px]">
        <label className="input input-bordered flex items-center gap-2 ">
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ed0cb1"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#e8029f" strokeWidth="1.008" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <input type="text" className="" placeholder={"Search for " + title + "'s address"} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button className="btn btn-info" onClick={search}>Search</button>
      </div>
      <div className="card p-4">
        {
          !hidden && loading ? 
          <span className="loading loading-dots loading-lg"></span>
          :
          !hidden && !loading && result ?
          <div onClick={getData} className="flex items-center gap-3 p-2 rounded-full bg-success w-full max-w-[500px] cursor-pointer border-success">  
            <div className="avatar placeholder">
              <div className="text-neutral-content shadow-md rounded-full w-12">
                <span className="text-2xl">{"A"}</span>
              </div>
            </div>
            <div className="min-w-fit">
              {/* <div className="font-bold">{result.name}</div> */}
              <div className="text-sm text-neutral-content p-2">{result.address}</div>
            </div>
          </div> 
          :
          ""
        }
      </div>
    </div>
  )
}