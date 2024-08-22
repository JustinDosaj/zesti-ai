import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import convertDurationToReadable from "@/utils/recipe-time-format";


interface InfoProps {
  recipe?: any;
  setIsErrorOpen?: any;
}

export function Information({ recipe, setIsErrorOpen }: InfoProps) {
  
  const { date_added, date_created, owner, source } = recipe?.data;
  const { cook_time, prep_time, category, cuisine } = recipe;

  return (
    <div className="recipe-component-container p-6 rounded-lg shadow-md">
      <div className="inline-flex space-x-2 items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 w-full">More Information</h2>
        <button onClick={() => setIsErrorOpen(true)} className="text-red-600 hover:text-red-800 transition duration-200">
          <ExclamationCircleIcon className="h-7 w-7"/>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        {cuisine && (
          <div className="recipe-information-item">
            <span className="font-semibold">Cuisine:</span>
            <span className="ml-2">{cuisine}</span>
          </div>
        )}
        <div className="recipe-information-item">
          <span className="font-semibold">Category:</span>
          <span className="ml-2">{category || 'N/A'}</span>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Prep Time:</span>
          <span className="ml-2">{prep_time ? convertDurationToReadable(prep_time) : 'N/A'}</span>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Cook Time:</span>
          <span className="ml-2">{cook_time ? convertDurationToReadable(cook_time) : 'N/A'}</span>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Owner:</span>
          <button onClick={() => window.open(owner.profile_link)} className="ml-2 underline hover:text-gray-500">
            {`@${owner.username}`}
          </button>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Source:</span>
          <span className="ml-2">{source}</span>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Created:</span>
          <span className="ml-2">{date_created ? new Date(date_created).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="recipe-information-item">
          <span className="font-semibold">Added:</span>
          <span className="ml-2">{new Date(date_added).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
  


