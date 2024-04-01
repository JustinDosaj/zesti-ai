import { AdminAddNewCreator, AdminGetApplicantList } from "@/pages/api/admin/functions"
import { useEffect, useState } from "react"
import { Button } from "@/components/shared/button"

export function AddNewCreator() {
    
    const [ email, setEmail ] = useState<string>('')
    const [ affiliateCode, setAffiliateCode] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)    

    const addCreatorClick = async () => {
        setLoading(true)
        const response = await AdminAddNewCreator(email, affiliateCode, name)
        setEmail('')
        setAffiliateCode('')
        setName('')
        setLoading(false)
    }

    return(
        <div className="grid grid-cols-1 my-auto max-autos space-y-4">
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 w-64 border-gray-300 border rounded-3xl pl-2"
            />
            <input
                type="text"
                placeholder="Creator Affiliate Code"
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                className="py-2 w-64 border-gray-300 border rounded-3xl pl-2"
            />
            <input
                type="text"
                placeholder="Creator First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 w-64 border-gray-300 border rounded-3xl pl-2"
            />
            <Button onClick={addCreatorClick} className="w-fit" isLink={false} buttonType="button" text="Add New Creator" isDisabled={loading}/>
        </div>
    )
}

export function AdminCheckList() {
    return(
        <div>
            <p>1. Check for application on promotekit</p>
            <p>2. Change affiliate code to matching username (affiliate code in firebase)</p>
            <p>3. Fill out information </p>
            <p>4. Accept user on promotekit and add via admin page </p>
        </div>
    )
}

export function AdminApplicantList() {

    const [ applicants, setApplicants ] = useState<any[]>([])
    const [ loading, setLoading ] = useState<boolean>(true)


    useEffect(() => {
        const getApplicants = async () => {
            setLoading(true)
            const response = await AdminGetApplicantList()
            setApplicants(response)
            setLoading(false)
        }
        
        getApplicants()

    },[applicants])

    return(
        <div>
            <div className="flex-auto my-auto max-autos space-y-4 border p-4 rounded-3xl">
                <h1 className="font-bold">Pending Applications</h1>
                {applicants.map((applicant) => {
                    return(
                        <div key={applicant.email} className="inline-flex gap-4 w-full">
                            <p>{applicant.email}</p>
                            <p>{applicant.affiliate_code}</p>
                            <button 
                                className="text-primary-main"
                                onClick={() => window.open(applicant.social.tiktok_link)}>TikTok Profile</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
