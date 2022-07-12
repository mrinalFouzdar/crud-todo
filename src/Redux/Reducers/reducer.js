import { GET_TODOS, DELTE_USER, ADD_USER, SINGLE_TODO_DATA, UPDATE_DATA,REMOVE_SELECTED_TODO } from "../Actions/action.type";

const initialState = {
  tasks: [],
  taskSingle: [],
  loading: true,
};

export const taskReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };

    case DELTE_USER:
    case ADD_USER:
    case UPDATE_DATA:

      return {
        ...state,
        loading: false,
      };

    case SINGLE_TODO_DATA:
      return{
        ...state,
        taskSingle:payload,
        loading:false
      };
    
    case REMOVE_SELECTED_TODO:
    return {
      ...state,
      taskSingle:[]
    }
        
    default:
      return state;
  }
};
