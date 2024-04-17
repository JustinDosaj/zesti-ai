
/* NOT IN USE
    - keeping component for future use
*/

interface SwitchProps {
    isOn?: boolean,
    handleToggle?: any,
}

export function SwitchComponent({isOn, handleToggle}: SwitchProps) {
    
    return(
        <div className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-primary-main' : 'bg-gray-300'}`} onClick={() => handleToggle()}>
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    )
}