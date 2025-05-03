import { Activity } from "../types"

/**
 useReducer: Es una función de React que permite manejar el estado de un componente de manera más compleja que useState. Se utiliza para manejar estados que dependen de acciones o eventos, y permite crear un reducer para manejar el estado de manera más eficiente.
 
 state: Es un hook de React que permite manejar el estado de un componente. Se utiliza para almacenar y actualizar el estado de un componente, y se puede utilizar con useReducer para manejar estados más complejos.

 initialState: Es el estado inicial que se le pasa a useReducer o useState. Es el valor inicial del estado del componente.

 Action: Es un objeto que se utiliza para describir una acción que se va a realizar en el estado del componente. Se utiliza en useReducer para actualizar el estado del componente.

 Payload: Es el valor que se le pasa a la acción para actualizar el estado del componente. Se utiliza en useReducer para actualizar el estado del componente.

 Dispatch: Es una función que se utiliza para enviar una acción a useReducer. Se utiliza para actualizar el estado del componente.
 */

export type ActivityActions = 
{ type: 'save-activity', payload: { newActivity: Activity } } |
{ type: 'set-activeId', payload: { id: Activity['id'] } } |
{ type: 'delete-activity', payload: { id: Activity['id'] } } |
{ type: 'restart-app' }


export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state : ActivityState = initialState, 
    action: ActivityActions) => {

    if(action.type === 'save-activity') {
        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map(activity => 
                activity.id === state.activeId ? action.payload.newActivity : activity
            )
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        const updatedActivities = state.activities.filter(activity => activity.id !== action.payload.id)
        return {
            ...state,
            activities: updatedActivities
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state

}