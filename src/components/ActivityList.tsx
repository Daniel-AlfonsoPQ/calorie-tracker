import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useActivity } from "../hooks/useActivity";


export default function ActivityList() {

    const {state, dispatch, isEmptyActivities, categoryName} = useActivity()

  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center m-5">
            Comida y Actividades
        </h2>

        {
        isEmptyActivities ? <p className="text-center text-xl my-5">No hay actividades registradas</p> :
        
        state.activities.map(activity => (
            <div key={activity.id} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex justify-between">
                <div className="space-y-3 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(activity.category)}</p>
                    <p className="text-2xl font-bold pt-3">{activity.name}</p>
                    <p className="font-black text-4xl text-lime-500">{activity.calories} {''}
                        <span>Calorias</span>
                    </p>
                </div>

                <div className="flex gap-5 items-center">
                    <button
                        onClick={() => dispatch({type: 'set-activeId', payload: { id: activity.id }})}    
                    >
                        <PencilSquareIcon className="w-8 h-8 text-gray-800" />
                    </button>

                    <button
                        onClick={() => dispatch({type: 'delete-activity', payload: { id: activity.id }})}
                    >
                        <XCircleIcon className="w-8 h-8 text-red-600" />
                    </button>

                </div>
            </div>
        ))}
        
    </>
  )
}
