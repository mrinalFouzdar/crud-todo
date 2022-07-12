import { useState } from "react";
export const ShowTostCase = () => {
  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = (type) => {
    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Success",
          description: "You have done your job",
          backgroundColor: "#5cb85c",
        };
        break;

      case "Delete":
        toastProperties = {
          id: list.length + 1,
          title: "Delete",
          description: "You have deleted your todo's itm",
          backgroundColor: "#f0ad4e",
        };
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties]);
  };

  return { showToast, list, setList };
};
