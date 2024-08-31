import { useEffect, useState } from "react";

function Todo() {
  let allTask = JSON.parse(localStorage.getItem("todo")) || [
    {
      taskName: "Buy Car",
    },
    {
      taskName: "Buy Iphone",
    },
  ];

  const [task, setTask] = useState("");
  const [addTask, addTaskFun] = useState(allTask);
  const [Ctastk, setCtask] = useState(0);
  const [uCtask, setuCtask] = useState(0);
  const [totalTask, setTotalTask] = useState(0);

  function handleCheck(id) {
    const myArray = [...addTask];
    myArray[id].complete = !myArray[id].complete;
    addTaskFun(myArray);
  }

  function handleTask() {
    addTaskFun([...addTask, { taskName: task, complete: false }]);
    setTask("");
  }

  function inputFun(e) {
    setTask(e.target.value);
  }

  function handleForm(e) {
    e.preventDefault();
  }

  function handleDelete(id) {
    let deleteArray = [...addTask];
    let mainDelete = deleteArray.filter((value, index) => {
      return id !== index;
    });

    addTaskFun(mainDelete);
  }

  function handleEdit(id) {
    let editArray = [...addTask];
    let mainEditArray = editArray[id];
    let editInput = prompt(
      `Edit Task ${mainEditArray.taskName}`,
      mainEditArray.taskName
    );
    if (task) {
      let editObj = { taskName: editInput, complete: false };
      editArray.splice(id, 1, editObj);
      addTaskFun(editArray);
    }
  }

  useEffect(() => {
    let myArray = [...addTask];

    const completeTask = myArray.filter((value) => {
      return value.complete;
    });

    setCtask(completeTask.length);

    const uCompleteTask = myArray.filter((value) => {
      return !value.complete;
    });
    setuCtask(uCompleteTask.length);

    const totalT = myArray.filter((value) => {
      return value;
    });

    localStorage.setItem("todo", JSON.stringify(myArray));

    setTotalTask(totalT.length);
  }, [addTask]);

  return (
    <>
      <div>Todo App</div>

      <form onSubmit={handleForm}>
        <input type="text" onChange={inputFun} value={task} id="main_input" />
        <button type="submit" onClick={handleTask}>
          Submit
        </button>
      </form>

      <div>
        {addTask.map((value, index) => (
          <ul style={{ listStyle: "none" }}>
            <li>
              <div
                style={{
                  display: "flex",
                  width: "400px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <input type="checkbox" onClick={() => handleCheck(index)} />
                  <p
                    style={{
                      textDecoration: value.complete ? "line-through" : "",
                    }}
                  >
                    {value.taskName}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleEdit(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>

      <p>Complete Task :- {Ctastk}</p>
      <p>Remaining Task :- {uCtask}</p>
      <p>Total Task :- {totalTask}</p>
    </>
  );
}

export default Todo;
