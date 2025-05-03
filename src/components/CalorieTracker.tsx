import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {

    
    const totalCaloriesConsumed = useMemo(() => {
        return activities
            .filter(activity => activity.category === 1)
            .reduce((acc, activity) => acc + activity.calories, 0)
    }, [activities])

    const totalCaloriesBurned = useMemo(() => {
        return activities
            .filter(activity => activity.category === 2)
            .reduce((acc, activity) => acc + activity.calories, 0)
    }, [activities])

    const totalCalories = useMemo(() => totalCaloriesConsumed - totalCaloriesBurned, [activities])

  return (
    <>
    <h2 className="text-4xl font-black text-white text-center mb-3">Resumen de Calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay
                calories={totalCaloriesConsumed}
                text="Consumidas"
            />

            <CalorieDisplay
                calories={totalCaloriesBurned}
                text="Gastadas"
            />
            
            <CalorieDisplay
                calories={totalCalories}
                text="Diferencia"
            />
        </div>
    </>
  )
}
