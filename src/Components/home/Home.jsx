import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteTodos } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import  "./home.module.css"
import Button from "../../Container/Buttom/Button";
import { useHook } from "../../CostomHooks/useHook";
function Home() {
  const { tasks } = useSelector((state) => state.tasks);
  const {handNevigate} = useHook()
  const [count,setCount]=useState(0)
  const [istimerRunning,setIstimerRunning]=React.useState(false)
  const timRef= React.useRef(null)
  const startTimer=()=>{
      if(istimerRunning){
          return
      }
      timRef.current=setInterval(()=>{
        let time = handtimeconvert()
        // console.log(time);
          setCount(time)
      },2000)
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
    let cur_time = new Date()
   let conver= cur_time.getHours() + ":" + cur_time.getMinutes() 
   
  //  console.log(conver);
    return conver
  }
  // console.log(tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteTodos(id));
  };




  const handleTime=(target,cur)=>{
    if(!cur || !target){
      return "wait"
    }
    let[tar_h,tar_m]=target.split(":").map(Number)
    let[cur_h,cur_m]=cur.split(":").map(Number)
    let show_hour =(tar_h-cur_h)
    let show_min =Math.abs(tar_m-cur_m)
    // console.log(show_min);
    show_hour = (show_hour <=0? 0 : show_hour)

    if(show_hour <= 0 && show_min<=0 ){
        return "FAILD"
    }else{
      return (`${show_hour}:${show_min}`)
    }

    
  }

  return (
    <div>
      <div>
        <Button handlebtnClick={() => handNevigate("/from")}> ADD TODO</Button>
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
                <td>
                {handleTime(data.time,count)}
                </td>
                <td>
                  <Button handlebtnClick={()=>handleDelete(data.id)}>
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
