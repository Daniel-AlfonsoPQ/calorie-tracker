import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"


export default function CalorieTracker() {

    const { totalCalories, totalCaloriesBurned, totalCaloriesConsumed } = useActivity()

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
