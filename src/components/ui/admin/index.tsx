import { AdminAddNewCreator } from "@/pages/api/admin/functions"
import { useState } from "react"
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
            <Button onClick={addCreatorClick} isLink={false} buttonType="button" text="Add New Creator" isDisabled={loading}/>
        </div>
    )
}