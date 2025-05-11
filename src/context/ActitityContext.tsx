import { createContext, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categorias";
import { Activity } from "../types";

type ActivityProviderProps = {
    children: React.ReactNode;
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: React.Dispatch<ActivityActions>
    totalCaloriesConsumed: number
    totalCaloriesBurned: number
    totalCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children } : ActivityProviderProps) => 
    {
    const [state, dispatch] = useReducer(activityReducer, initialState)

    const totalCaloriesConsumed = useMemo(() => {
            return state.activities
                .filter(activity => activity.category === 1)
                .reduce((acc, activity) => acc + activity.calories, 0)
        }, [state.activities])
    
        const totalCaloriesBurned = useMemo(() => {
            return state.activities
                .filter(activity => activity.category === 2)
                .reduce((acc, activity) => acc + activity.calories, 0)
        }, [state.activities])
    
        const totalCalories = useMemo(() => totalCaloriesConsumed - totalCaloriesBurned, [state.activities])

        const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
    , [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            totalCaloriesConsumed,
            totalCaloriesBurned,
            totalCalories,
            categoryName,
            isEmptyActivities
        }}>
        {children}
        </ActivityContext.Provider>
    )
}