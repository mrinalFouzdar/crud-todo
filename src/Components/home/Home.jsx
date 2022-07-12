import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteTodos } from "../../Redux/Actions/actions";
import { Link, useNavigate } from "react-router-dom";
import  "./home.module.css"
import Button from "../../Container/Buttom/Button";
function Home() {
  const { tasks } = useSelector((state) => state.tasks);
  const [count,setCount]=useState(0)
  const [istimerRunning,setIstimerRunning]=React.useState(false)
  const timRef= React.useRef(null)
  const startTimer=()=>{
      if(istimerRunning){
          return
      }
      timRef.current=setInterval(()=>{
        let time = handtimeconvert()
          setCount(Date.now())
      },1000)
      setIstimerRunning(true)
  }

  const stopTimer=()=>{
      clearInterval(timRef.current)
      setIstimerRunning(false)
  }

  React.useEffect(()=>{
      startTimer()
      return stopTimer;
  },[])

  const handtimeconvert=()=>{
    
  }
  // console.log(tasks);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTodos(id));
  };
  const handleNevigat = () => {
    nevigate("/from");
  };
  return (
    <div>
      <div>
        <button onClick={() => handleNevigat()}> ADD TODO</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Staus</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks &&
            tasks.map((data) => (
              <tr key={data.id}>
                <td>{data.task}</td>
                <td>{data.time}
                {Date.now()}
                </td>
                <td>
                  <Button onClick={() => handleDelete(data.id)}>
                    <AiFillDelete />
                  </Button>
                  <Button >
                    <Link to={`/editbyId/${data.id}`}
                    >
                    <AiFillEdit />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
