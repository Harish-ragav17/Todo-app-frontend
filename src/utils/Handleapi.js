import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_Backendurl;


const updatetick = async (id, setitems,Navigate) => {
  try {
    await axios.post(`${baseUrl}/updatetick`, { id }).then((data) => {
      gettodo(setitems,Navigate);
    });
  } catch (err) {
    toast.error("Failed to update task. Please try again. ⚠️", {
      position: "top-right",
      autoClose: 1000,
    });
  }
};
export { updatetick };

const login = async (email, password, setisLoggedIn,Navigate) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, { email, password });

    if (data.success) {
      setisLoggedIn(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", JSON.stringify(data.username));

      toast.success("Login Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Login failed. Please try again. ⚠️", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export { login };

const register = async (name, email, password,Navigate) => {
  try {
    const { data } = await axios.post(`${baseUrl}/register`, {
      name,
      email,
      password,
    });

    if (data.success) {
      toast.success("Registration Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Registration failed. Please try again. ⚠️", {
      position: "top-right",
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
      Navigate("/login");
    } else {
      toast.error("Error fetching username", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }
};
export { fetchUsernameAndPoints };

const addTask = async (taskData, setitems, items,Navigate) => {
  try {
    const { data } = await axios.post(`${baseUrl}/addtask`, taskData, {
      headers: {
        Authorization: `Bearer ${gettoken()}`,
      },
    });

    if (data.message === "Task added successfully") {
      await gettodo(setitems,Navigate);
      toast.success("Task Added Successfully 🎉", {
        position: "top-right",
        autoClose: 500,
      });
      return true;
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
      });
      return false;
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to add task. Please try again. ⚠️", {
      position: "top-right",
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

const deletetodo = (id, setitems,Navigate) => {
  axios
    .post(
      `${baseUrl}/delete`,
      { _id: id },
      {
        headers: {
          Authorization: `Bearer ${gettoken()}`,
        },
      }
    )
    .then((data) => {
      gettodo(setitems,Navigate);
      toast.success("Task Deleted Successfully 🗑️", {
        position: "top-right",
        autoClose: 1000,
      });
    })
    .catch((err) => {
      console.error("Delete failed:", err);
    });
};

export { deletetodo };

const editTodoText = async (editText, editId, setitems,Navigate) => {
  try {
    await axios
      .post(`${baseUrl}/edittext`, { text: editText, _id: editId })
      .then(async (data) => {
        await gettodo(setitems,Navigate);
        toast.success("Task Edited Successfully ✏️", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  } catch (err) {
    toast.error("Edit failed:", err);
  }
};

export { editTodoText };
