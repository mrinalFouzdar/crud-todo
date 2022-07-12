import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, updateTodosData } from "../Redux/Actions/actions";
export const useHook = (onSubmit) => {
  const [formData, setFormData] = useState({
    task: "",
    time: "",
    status: "Pending",
  });
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    // console.log(formData)

    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { task, time } = formData;
  const handleSubmit = (e, id) => {
    e.preventDefault();
    // console.log(data)
    if (!task || !time) {
      alert("error");
      return;
    } else {
      id
        ? dispatch(updateTodosData(formData, id))
        : dispatch(addUser(formData));
      handNevigate("/");
    }
  };

  const handNevigate = (data) => {
    nevigate(data);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handNevigate,
    setFormData,
  };
};
