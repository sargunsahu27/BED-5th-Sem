// async function getCommentData(){
//     try{
//     const res=await axios.get("https://jsonplaceholder.typicode.com/comments")
    
//         console.log(res.data);
//     }catch(error){
//         console.log("Error in fetching comments",error);
//     }
// }
// getCommentData();
// fetch and axios is same
function adduser(email,password){
    axios.post('/user', {
    email: email,
    password: password
  })
  .then((response) =>{
    console.log(response.data);
  })
  .catch((error)=> {
    console.log(error.message);
  });
}
adduser("sargun@gmail.com","12345");