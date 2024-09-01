import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TodoCss from "./Todo.module.css";

function Todo() {
  let allTask = JSON.parse(localStorage.getItem("todo")) || [];

  const [task, setTask] = useState("");
  const [addTask, setAddTask] = useState(allTask);
  const [rTask, setRtask] = useState(0);
  const [cTask, setCtask] = useState(0);
  const [totalTask, setTotalTask] = useState(0);

  function handleForm(e) {
    return e.preventDefault();
  }

  function handleInput(e) {
    setTask(e.target.value);
  }

  function addtaskFun() {
    if (task) {
      let myArray = [...addTask, { taskName: task, complete: false }];
      setAddTask(myArray);
    }
    setTask("");

    if (task) {
      toast.success("Successfully added task");
    } else {
      toast.error("Task not filed");
    }
  }

  function handleCheck(id) {
    let checkComplete = [...addTask];
    checkComplete[id].complete = !checkComplete[id].complete;
    setAddTask(checkComplete);

    let inputBoolean =
      document.getElementsByClassName("input_toast")[id].checked;

    if (inputBoolean === true) {
      toast.success("Task Complete");
    }

    if (inputBoolean === false) {
      toast.error("Remaining Task");
    }
  }

  function handleDelete(id) {
    let deleteArray = [...addTask];
    let mainDelete = deleteArray.filter((value, index) => {
      return id !== index;
    });
    toast.success("Task Deleted");

    setAddTask(mainDelete);
  }

  function handleEdit(id) {
    let editArray = [...addTask];
    let editId = editArray[id];
    let editPrompt = prompt(`Edit Task ${editId.taskName}`, editId.taskName);
    if (editPrompt) {
      let editOpj = { taskName: editPrompt, complete: false };
      editArray.splice(id, 1, editOpj);
      setAddTask(editArray);
    }
  }

  function allDelete() {
    setAddTask([]);
    toast.success("All Task Deleted");
  }

  useEffect(() => {
    let checkComplete = [...addTask];
    let ramainingTask = checkComplete.filter((value, index) => {
      return !value.complete;
    });
    setRtask(ramainingTask.length);

    let completeTask = checkComplete.filter((value, index) => {
      return value.complete;
    });

    setCtask(completeTask.length);

    let totalTaskNo = checkComplete.filter((value, index) => {
      return value;
    });
    setTotalTask(totalTaskNo.length);

    localStorage.setItem("todo", JSON.stringify(addTask));
  }, [addTask]);

  return (
    <>
      <Toaster />
      <div className={`${TodoCss.main_todo} ${TodoCss.only_center}`}>
        <div className={TodoCss.todo_box}>
          <div className={`${TodoCss.app_name}`}>
            <h1>Yadav</h1>
            <button className={`${TodoCss.only_center} btn`}>
              <i class="fa-solid fa-moon"></i>
            </button>
          </div>
          <div className={`${TodoCss.todo_form} ${TodoCss.box_sdw} mt-4`}>
            <form onClick={handleForm}>
              <div className={`${TodoCss.input_plus}`}>
                <i class="fa-solid fa-plus"></i>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                onChange={handleInput}
                value={task}
              />
              <button className="form-control  ms-3" onClick={addtaskFun}>
                ADD
              </button>
            </form>
          </div>

          <div className={`${TodoCss.todo_content} ${TodoCss.box_sdw} mt-4`}>
            <div className={TodoCss.content_acc_sec}>
              <p>
                <span>{rTask}</span> tasks left
              </p>
              <p>
                <span>{cTask}</span> Complete task
              </p>
              <p>
                <span>{totalTask}</span> Total task
              </p>
              <button
                style={{ boxShadow: "none" }}
                className={`btn ${TodoCss.alldelete_task}`}
                onClick={allDelete}
              >
                <i class="fa-regular fa-trash-can text-danger"></i>
              </button>
            </div>
            <div className={TodoCss.todo_content_box}>
              <div className={TodoCss.todo_list}>
                {addTask.map((value, index) => (
                  <ul>
                    <li className="d-flex justify-content-between w-100">
                      <div className="d-flex align-items-center">
                        <input
                          className="form-check-input me-3 input_toast"
                          type="checkbox"
                          id="checkboxNoLabel"
                          value=""
                          aria-label="..."
                          checked={value.complete}
                          onClick={() => handleCheck(index)}
                        />
                        <p
                          style={{
                            textDecoration: value.complete
                              ? "line-through"
                              : "",
                          }}
                        >
                          {" "}
                          {value.taskName}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
                          <i class="fa-regular fa-pen-to-square text-info"></i>
                        </button>
                        <button
                          className="ms-3"
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <i class="fa-regular fa-trash-can text-danger"></i>
                        </button>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
