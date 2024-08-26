import { useState } from "react";


interface IngredientProps {
  ingredients?: any;
}

export function Ingredients({ ingredients }: IngredientProps) {

    const [checkedItems, setCheckedItems] = useState<boolean[]>(ingredients.map(() => false));

    const handleCheckboxChange = (index: number) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
    };

    return (
        <div className="recipe-component-container">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Ingredients</h2>
            <ul className=" text-gray-900 space-y-4">
                {ingredients?.map((ingredient: string, index: number) => (
                <li key={index} className="mb-2 flex items-center">
                    <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-3 h-4 w-4 hover:cursor-pointer"
                    />
                    <span className={checkedItems[index] ? "line-through text-gray-500 w-full" : "w-full"}>
                    {ingredient}
                    </span>
                </li>
                ))}
            </ul>
        </div>
    );
}