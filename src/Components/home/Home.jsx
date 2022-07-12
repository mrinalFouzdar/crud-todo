import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "./home.module.css";
import Button from "../../Container/Buttom/Button";
import { useHook } from "../../CostomHooks/useHook";
import { DataFetchHook } from "../../CostomHooks/dataFetch";
import Toast from "../../Container/Toast/Toast";
import { ShowTostCase } from "../../CostomHooks/showTostCase";
function Home() {
  const { tasks } = useSelector((state) => state.tasks);
  const { handNevigate } = useHook();
  const { deleteTodosData, upddateData } = DataFetchHook();
  const { showToast, list, setList } = ShowTostCase();

  const [count, setCount] = useState(0);
  const [istimerRunning, setIstimerRunning] = React.useState(false);
  const timRef = React.useRef(null);
  const startTimer = () => {
    if (istimerRunning) {
      return;
    }
    timRef.current = setInterval(() => {
      let time = handtimeconvert();
      // console.log(time);
      setCount(time);
    }, 2000);
    setIstimerRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timRef.current);
    setIstimerRunning(false);
  };

  React.useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  const handtimeconvert = () => {
    let cur_time = new Date();
    let conver = cur_time.getHours() + ":" + cur_time.getMinutes();

    //  console.log(conver);
    return conver;
  };
  // console.log(tasks);

  const handleTime = (target, cur, data) => {
    if (!cur || !target) {
      return "wait";
    }
    let [tar_h, tar_m] = target.split(":").map(Number);
    let [cur_h, cur_m] = cur.split(":").map(Number);
    let show_hour = tar_h - cur_h;
    let show_min = Math.abs(tar_m - cur_m);
    show_hour = show_hour <= 0 ? 0 : show_hour;

    if (show_hour <= 0 && show_min <= 0 && data.status === "Pending") {
      data = { ...data, status: "FAILD" };
      upddateData(data, data.id);
    } else {
      return `${show_hour}:${show_min}`;
    }
  };

  const handleToggle = (data, id) => {
    data = { ...data, status: "DONE" };
    upddateData(data, id);
    showToast("success");
  };

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
                  <span>
                    {data.status === "DONE"
                      ? data.status
                      : data.status === "FAILD"
                      ? "FAILD"
                      : handleTime(data.time, count, data)}
                  </span>
                  <Button
                    handlebtnClick={() => handleToggle(data, data.id)}
                    handelDisable={
                      data.status === "DONE" || data.status === "FAILD"
                    }
                  >
                    Stuaus Change
                  </Button>
                </td>
                <td>
                  <Button
                    handlebtnClick={() => {
                      deleteTodosData(data.id);
                      showToast("Delete");
                    }}
                  >
                    <AiFillDelete className={styled.btn} />
                  </Button>
                  {data.status === "DONE" || data.status === "FAILD" ? null : (
                    <Button>
                      <Link to={`/editbyId/${data.id}`}>
                        <AiFillEdit className={styled.btn} />
                      </Link>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Toast toastlist={list} position="buttom-right" setList={setList} />
    </div>
  );
}

export default Home;
