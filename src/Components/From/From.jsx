import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../Container/Buttom/Button";
import { useHook } from "../../CostomHooks/useHook";
import { removeselectedTodo, singleTodos } from "../../Redux/Actions/actions";
const From = () => {
  const {taskSingle } = useSelector((state) => state.tasks);
  const {id} = useParams()
  const dispatch = useDispatch()
  const { formData, handleInputChange, handleSubmit, handNevigate ,setFormData} = useHook(
    {
      task: "",
      time: "",
    },
    (formData) => {
      console.log(formData);
      console.log("hello");
    }
  );
  console.log(id);

  useEffect(()=>{
    if(id){
      dispatch(singleTodos(id))
      handlefromDataSet()
  }
  return ()=>{
    dispatch(removeselectedTodo())
  }

  },[id])

  const handlefromDataSet=()=>{
    console.log(taskSingle,"a");
    if(taskSingle.length!==0 ){
      setFormData({task:taskSingle.task,time:taskSingle.time})
    }else{
      handNevigate()
    }  
  
}


  const { task, time } = formData;

  return (
    <div>
      <div>
        <Button onClick={handNevigate}>GO BACK</Button>
      </div>
      <form onSubmit={(e)=>handleSubmit(e,id)}>
        <input
          type="text"
          name="task"
          value={task ?task:""}
          onChange={handleInputChange}
        />
        <br />
        <br />
     
        <input
          type="time"
          name="time"
          value={time?time :""}
          onChange={handleInputChange}
        />
        <br />
        <br />
        { 
          id ? <Button type="submit"> EDIT</Button> :
        <Button type="submit">Submit</Button>

        }
      </form>
    </div>
  );
};

export default From;
