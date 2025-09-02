import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_Backendurl;


const updatetick = async (id, setitems, Navigate) => {
  const loadingToast = toast.loading("Updating task... ⏳", {
    position: "top-right",
  });

  try {
    await axios.post(
      `${baseUrl}/updatetick`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${gettoken()}`,
        },
      }
    );

    toast.update(loadingToast, {
      render: "Task updated successfully ✅",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });

    gettodo(setitems, Navigate);
  } catch (err) {
    toast.update(loadingToast, {
      render: "Failed to update task. Please try again ⚠️",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
  }
};

export { updatetick };


const login = async (email, password, setisLoggedIn, Navigate) => {
  const loadingToast = toast.loading("Logging in... ⏳", {
    position: "top-right",
  });

  try {
    const { data } = await axios.post(`${baseUrl}/login`, { email, password });

    if (data.success) {
      setisLoggedIn(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", JSON.stringify(data.username));

      toast.update(loadingToast, {
        render: "Login Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } else {
      toast.update(loadingToast, {
        render: data.message || "Login failed ⚠️",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  } catch (err) {
    toast.update(loadingToast, {
      render: "Login failed. Please try again. ⚠️",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
};

export { login };


const register = async (name, email, password, Navigate) => {
  let toastId;
  try {
    toastId = toast.loading("Registering your account...");

    const { data } = await axios.post(`${baseUrl}/register`, {
      name,
      email,
      password,
    });

    if (data.success) {
      toast.update(toastId, {
        render: "Registration Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } else {
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  } catch (err) {
    console.error(err);
    toast.update(toastId, {
      render: "Registration failed. Please try again. ⚠️",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
};

export { register };


// Helper for getting token and redirecting if not present

const gettoken = () => {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";

  return token;
};

// end of helper

const fetchUsernameAndPoints = async (setuserdata,Navigate) => {
  try {
    const { data } = await axios.get(`${baseUrl}/getusernameandpoints`, {
      headers: {
        Authorization: `Bearer ${gettoken()}`,
      },
    });
    setuserdata(data);
  } catch (err) {
    if (err.response.data.error === "Invalid token") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } else {
      toast.error("Error fetching username", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }
};
export { fetchUsernameAndPoints };

const addTask = async (taskData, setitems, items, Navigate) => {
  const toastId = toast.loading("Adding task... ⏳", {
    position: "top-right",
  });

  try {
    const { data } = await axios.post(`${baseUrl}/addtask`, taskData, {
      headers: {
        Authorization: `Bearer ${gettoken()}`,
      },
    });

    if (data.message === "Task added successfully") {
      await gettodo(setitems, Navigate);

      toast.update(toastId, {
        render: "Task Added Successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      return true;
    } else {
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      return false;
    }
  } catch (err) {
    
    toast.update(toastId, {
      render: "Failed to add task. Please try again. ⚠️",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });

    return false;
  }
};

export { addTask };


const gettodo = async (setitems,Navigate) => {
  try {
    await axios
      .get(`${baseUrl}/gettodo`, {
        headers: { Authorization: `Bearer ${gettoken()}` },
      })
      .then(({ data }) => {
        setitems(data);
      });
  } catch (err) {
    if (err.response.data.error === "Invalid token") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      Navigate("/login");
    }
  }
};
export { gettodo };

const deletetodo = async (id, setitems, Navigate) => {
  const toastId = toast.loading("Deleting task... ⏳", {
    position: "top-right",
  });

  try {
    const { data } = await axios.post(
      `${baseUrl}/delete`,
      { _id: id },
      {
        headers: {
          Authorization: `Bearer ${gettoken()}`,
        },
      }
    );

    await gettodo(setitems, Navigate);

    toast.update(toastId, {
      render: "Task Deleted Successfully 🗑️",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  } catch (err) {
    console.error("Delete failed:", err);

    toast.update(toastId, {
      render: "Failed to delete task. Please try again ⚠️",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }
};

export { deletetodo };


const editTodoText = async (editText, editId, setitems, Navigate) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/edittext`,
      { text: editText, _id: editId },
      {
        headers: {
          Authorization: `Bearer ${gettoken()}`,
        },
      }
    );

    if (data.message === "Task updated successfully") {
      await gettodo(setitems, Navigate);
      toast.success("Task Edited Successfully ✏️", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.error(data.message || "Edit failed ⚠️", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  } catch (err) {
    console.error("Edit failed:", err);
    toast.error("Failed to edit task. Please try again. ⚠️", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export { editTodoText };
  
