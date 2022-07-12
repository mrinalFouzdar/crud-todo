import { GET_TODOS, DELTE_USER, ADD_USER, SINGLE_TODO_DATA, UPDATE_DATA, REMOVE_SELECTED_TODO } from "./action.type";
import axios from "axios";

const getTodosData = (data) => ({
  type: GET_TODOS,
  payload: data,
});
const todosDeleted = () => ({
  type: DELTE_USER,
});
const userADDed = () => ({
  type: ADD_USER,
});
const updateTodos = () => ({
  type: UPDATE_DATA,
});
const getDataSingle = (data) => ({
  type: SINGLE_TODO_DATA,
  payload:data
});

export const removeselectedTodo = ()=>({
   
  type:REMOVE_SELECTED_TODO

})

export const fetchTodosData = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API}`)
    .then((res) => {
      dispatch(getTodosData(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteTodos = (id) =>async (dispatch) => {
 await axios
    .delete(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(todosDeleted());
      dispatch(fetchTodosData());
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addUser = (data) =>async (dispatch) => {
 await axios
    .post(`${process.env.REACT_APP_API}`, data)
    .then((res) => {
      dispatch(userADDed());
      dispatch(fetchTodosData());
    })
    .catch((err) => {
      console.log(err);
    });
};


export const singleTodos = (id) =>async (dispatch) => {
 await axios
    .get(`${process.env.REACT_APP_API}/${id}`)
    .then((res) => {
      dispatch(getDataSingle(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateTodosData = (item,id) => async(dispatch) => {
 await axios
    .put(`${process.env.REACT_APP_API}/${id}`,item)
    .then((res) => {
      dispatch(updateTodos());
      dispatch(fetchTodosData());

    })
    .catch((err) => {
      console.log(err);
    });
};