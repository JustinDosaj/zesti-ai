import { AdminAddNewCreator, AdminGetApplicantList, AdminRejectCreator } from "@/pages/api/admin/functions"
import { useEffect, useState } from "react"
import { Button } from "@/components/shared/button"
import { classNames } from "@/components/shared/classNames"
import { Loader } from "@/components/shared/loader"

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
                placeholder="Creator Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 w-96 border-gray-300 border rounded-3xl pl-2"
            />
            <input
                type="text"
                placeholder="Creator Chosen Affiliate Code"
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                className="py-2 w-96 border-gray-300 border rounded-3xl pl-2"
            />
            <input
                type="text"
                placeholder="Creator Name for Personalized Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 w-96 border-gray-300 border rounded-3xl pl-2"
            />
            <Button onClick={addCreatorClick} className="w-fit" isLink={false} buttonType="button" text="Add New Creator" isDisabled={loading}/>
        </div>
    )
}

export function AdminApplicantList() {

    const [ applicants, setApplicants ] = useState<any[]>([])
    const [ applicantName, setApplicantName ] = useState<string>('')
    const [ confirm, setConfirm ] = useState<boolean>(false) 
    const [ confirmReject, setConfirmReject ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {

        const getApplicants = async () => {
            const response = await AdminGetApplicantList();
            setApplicants(response);
        };
        
        getApplicants();

    }, []);

    const acceptClick = async (applicant: any, name: string) => {

        if(!confirm && applicantName !== '') { 
            setConfirm(true); 
            return;
        }

        if (applicantName !== '' && confirm) {
            setLoading(true)
            await AdminAddNewCreator(applicant.email, applicant.affiliate_code, name)
            setLoading(false)
            setConfirm(false)
        }

    }

    const rejectClick = async (applicant: any) => {

        if(!confirmReject) {
            setConfirmReject(true);
            return;
        }

        if(confirmReject) {
            setLoading(true)
            await AdminRejectCreator(applicant.id)
            setLoading(false)
            setConfirmReject(false)
        }
    }

    return(
        <div className="my-auto">
            <div className="flex-auto my-auto max-autos space-y-4 border p-4 rounded-3xl">
                <h1 className="font-bold">Pending Applications</h1>
                {applicants.map((applicant) => {
                    return(
                        <div key={applicant.email} className="inline-flex gap-8 w-full">
                            <p>{applicant.email}</p>
                            <p>{applicant.affiliate_code}</p>
                            <button 
                                className="text-primary-main"
                                onClick={() => window.open(applicant.settings.tiktok.profile_link)}>
                                    TikTok Profile
                            </button>

                            <input
                                className="border-gray-300 border rounded-3xl px-4 text-center"
                                placeholder="Input Applicant Name"
                                onChange={(e) => setApplicantName(e.target.value)}
                            >
                            </input>

                            { /* Deny User */ }
                            { !loading ? 
                            <div className="space-x-4">
                                <button
                                    className={classNames(confirmReject ? " bg-yellow-500 hover:bg-yellow-400" : " bg-red-600 hover:bg-red-500", "text-white px-3 rounded-3xl")}
                                    onClick={() => rejectClick(applicant)}
                                >
                                    <p className="text-center">Reject</p>
                                </button>

                                { /*Accept User */ }
                                <button
                                    className={classNames(confirm ? " bg-yellow-500 hover:bg-yellow-400" : " bg-green-600 hover:bg-green-500", "text-white px-3 rounded-3xl")}
                                    onClick={() => acceptClick(applicant, applicantName)}
                                >
                                    <p className="text-center">Accept</p>
                                </button>
                            </div>
                            :
                            <Loader/>
                            }
                        </div>
                    )
                })}
            </div>
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

