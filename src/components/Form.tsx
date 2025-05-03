import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../types';
import { categories } from '../data/categorias';
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';

 type FormProps = {
    dispatch: React.Dispatch<ActivityActions>
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        } else {
            setActivity(initialState)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () =>{
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: "save-activity", payload: { newActivity: activity }})

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }
  return (
    <form 
        className="space-y-5 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className=' font-bold'>Categoria:</label>
            <select 
                className="border border-slate-300 rounded-lg p-2 bg-white"
                name="" 
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                <option value="">Selecciona una categoria</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className=' font-bold'>Actividad:</label>
            <input 
                type="text" 
                id="name" 
                placeholder="Ej. Comida, Jugo Naranja, Ensalada, etc."
                className="border border-slate-300 rounded-lg p-2 bg-white"
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className=' font-bold'>Calorias:</label>
            <input 
                type="number" 
                id="calories" 
                placeholder="Calorias. ej. 200, 400, etc."
                className="border border-slate-300 rounded-lg p-2 bg-white"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-700 w-full p-2 font-black uppercase text-center text-white rounded-lg cursor-pointer transition-colors disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}
