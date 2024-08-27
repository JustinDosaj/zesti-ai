import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import convertDurationToReadable from "@/utils/recipe-time-format";

interface InfoProps {
  recipe?: any;
  setIsErrorOpen?: any;
}

export function Information({ recipe, setIsErrorOpen }: InfoProps) {
  
  const { date_added, date_created, owner, source } = recipe?.data;
  const { cook_time, prep_time, category, cuisine } = recipe;

  const list = [
    { label: 'Cuisine', value: cuisine },
    { label: 'Category', value: category },
    { label: 'Prep Time', value: prep_time ? convertDurationToReadable(prep_time) : 'N/A' },
    { label: 'Cook Time', value: cook_time ? convertDurationToReadable(cook_time) : 'N/A' },
    { label: 'Owner', value: `@${owner?.username}` || 'N/A' }, // Adjusted to render the username
    { label: 'Source', value: source?.profile_link || 'N/A' }, // Adjusted to render the profile link or another string property
    { label: 'Created', value: date_created ? new Date(date_created).toLocaleDateString() : 'N/A' },
    { label: 'Added', value: date_added ? new Date(date_added).toLocaleDateString() : 'N/A' },
  ]

  return (
    <div className="recipe-component-container p-6 rounded-lg shadow-md">
      <div className="inline-flex space-x-2 items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 w-full">More Information</h2>
        <button onClick={() => setIsErrorOpen(true)} className="text-red-600 hover:text-red-800 transition duration-200">
          <ExclamationCircleIcon className="h-7 w-7"/>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        {list.map((item: any) => (
          <div key={item.label} className="recipe-information-item">
            <span className="font-semibold">{item.label}:</span>
            {item.label === "Owner" ? 
              <button onClick={() => window.open(owner.profile_link)} className="ml-2 underline hover:text-gray-500">
                {`@${owner.username}`}
              </button>
            : 
              <span className="ml-2">{item.value}</span>
            }

          </div>
        ))}
      </div>
    </div>
  );
}
  


