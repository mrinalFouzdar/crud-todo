import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../Container/Buttom/Button";
import { DataFetchHook } from "../../CostomHooks/dataFetch";
import { useHook } from "../../CostomHooks/useHook";
import styled from "./from.module.css";
const From = () => {
  const { taskSingle } = useSelector((state) => state.tasks);
  const { id } = useParams();
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handNevigate,
    setFormData,
  } = useHook();
  const { fetchbyId, dataClenUp } = DataFetchHook();

  useEffect(() => {
    if (id) {
      fetchbyId(id);
      handlefromDataSet();
    }
    return () => {
      dataClenUp();
    };
  }, [id]);

  const handlefromDataSet = () => {
    // console.log(taskSingle,"a");
    if (taskSingle.length !== 0) {
      setFormData({ ...taskSingle });
    } else {
      handNevigate("/");
    }
  };

  const { task, time } = formData;

  return (
    <div>
      <div className={styled.btn_div}>
        {/* nevigate to home page */}
        <Button handlebtnClick={() => handNevigate("/")}>GO BACK</Button>
      </div>
      <form onSubmit={(e) => handleSubmit(e, id)}>
        <input
          type="text"
          name="task"
          value={task ? task : ""}
          onChange={handleInputChange}
          className={styled.iptText}
          placeholder="ADD..."
        />
        <br />
        <br />

        <input
          type="time"
          name="time"
          value={time ? time : ""}
          onChange={handleInputChange}
        />
        <br />
        <br />
        {id ? (
          <Button type="submit"> EDIT</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </div>
  );
};

export default From;
