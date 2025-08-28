import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_Backendurl;
console.log(process.env.REACT_APP_Backendurl);

const settodo = (newItem, setNewItem, setitems) => {
  const text = newItem;
  axios.post(`${baseUrl}/save`, { text }).then((data) => {
    setNewItem("");
    gettodo(setitems);
  });
};
export { settodo };

const updatetick = async (id, setitems) => {
  try {
    await axios.post(`${baseUrl}/updatetick`, { id }).then((data) => {
      gettodo(setitems);
    });
  } catch (err) {
    toast.error("Failed to update task. Please try again. ⚠️", {
      position: "top-right",
      autoClose: 1000,
    });
  }
};
export { updatetick };

const login = async (email, password, setisLoggedIn) => {
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
        window.location.href = "/";
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

const register = async (name, email, password) => {
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
        window.location.href = "/login";
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

const fetchUsernameAndPoints = async (setuserdata) => {
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
      window.location.href = "/login";
    } else {
      toast.error("Error fetching username", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }
};
export { fetchUsernameAndPoints };

const addTask = async (taskData, setitems, items) => {
  try {
    const { data } = await axios.post(`${baseUrl}/addtask`, taskData, {
      headers: {
        Authorization: `Bearer ${gettoken()}`,
      },
    });

    if (data.message === "Task added successfully") {
      await gettodo(setitems);
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

const gettodo = async (setitems) => {
  try {
    await axios
      .get(`${baseUrl}/gettodo`, {
        headers: { Authorization: `Bearer ${gettoken()}` },
      })
      .then(({ data }) => {
        setitems(data);
      });
  } catch (err) {
    console.log(err);
    if (err.response.data.error === "Invalid token") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
  }
};
export { gettodo };

const deletetodo = (id, setitems) => {
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
      gettodo(setitems);
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

const editTodoText = async (editText, editId, setitems) => {
  try {
    await axios
      .post(`${baseUrl}/edittext`, { text: editText, _id: editId })
      .then(async (data) => {
        await gettodo(setitems);
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
