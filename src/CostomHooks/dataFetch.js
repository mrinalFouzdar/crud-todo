import { useDispatch } from "react-redux";
import {
  deleteTodos,
  removeselectedTodo,
  singleTodos,
  updateTodosData,
} from "../Redux/Actions/actions";

export const DataFetchHook = () => {
  const dispatch = useDispatch();
  const fetchbyId = (id) => {
    dispatch(singleTodos(id));
  };

  const dataClenUp = () => {
    dispatch(removeselectedTodo());
  };

  const upddateData = (data, id) => {
    dispatch(updateTodosData(data, id));
  };

  const deleteTodosData = (id) => {
    dispatch(deleteTodos(id));
  };
  return { fetchbyId, dataClenUp, upddateData, deleteTodosData };
};
