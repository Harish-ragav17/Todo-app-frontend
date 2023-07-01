import axios from "axios";

const baseUrl = "http://localhost:5000";

const gettodo = (setitems) => {
  axios.get(baseUrl).then(({ data }) => {
    setitems(data);
  });
};
export { gettodo };

 const settodo = (newItem, setNewItem, setitems) => {
  const text = newItem;
  axios.post(`${baseUrl}/save`, { text }).then((data) => {
    setNewItem("")
   gettodo(setitems);
  });
};
export { settodo };

const updatetick=(_id,setitems)=>
{ 
  
    axios.post(`${baseUrl}/updatetick`,{_id}).then((data)=>
    {
      gettodo(setitems)
    })
  
}
export {updatetick}

const deletetodo=(_id,setitems)=>
{
  
    axios.post(`${baseUrl}/delete`,{_id}).then((data)=>
    {
      gettodo(setitems) 
    })
    
 
}
export {deletetodo}
