import { AdminAddNewCreator } from "@/pages/api/admin/functions"
import { useState } from "react"
import { Button } from "@/components/shared/button"

export function AddNewCreator() {
    
    const [ email, setEmail ] = useState<string>('')
    const [ affiliateCode, setAffiliateCode] = useState<string>('')
    const [ name, setName ] = useState<string>('')    

    const addCreatorClick = async () => {
        const response = await AdminAddNewCreator(email, affiliateCode, name)
        setEmail('')
        setAffiliateCode('')
        setName('')
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
                placeholder="TikTok Username"
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                className="py-2 w-64 border-gray-300 border rounded-3xl pl-2"
            />
            <input
                type="text"
                placeholder="Creator Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 w-64 border-gray-300 border rounded-3xl pl-2"
            />
            <Button onClick={addCreatorClick} isLink={false} buttonType="button" text="Add New Creator"/>
        </div>
    )
}