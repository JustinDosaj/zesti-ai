import { useState } from 'react';

interface InstructionProps {
  instructions?: any;
}

export function Instructions({ instructions }: InstructionProps) {
  
    const [checkedItems, setCheckedItems] = useState<boolean[]>(instructions.map(() => false));

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="recipe-component-container">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Instructions</h2>
      <ol className="text-gray-900 space-y-6">
        {instructions?.map((instruction: string, index: number) => (
          <li key={index} className="flex items-center h-full">
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
              className="mr-3 h-4 w-4 hover:cursor-pointer"
            />
            <span className={checkedItems[index] ? "line-through text-gray-500 w-full" : "w-full"}>
              {instruction}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
