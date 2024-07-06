import {Button, Container, TextField, Typography,Paper} from "@mui/material"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

export interface UserInfo{
  name:string;
  phoneNumber:string;
  email:string;
};
function Login() {
  // Name PhoneNumber email


  const [user,setUser]=useState<UserInfo>();
  const [error,setError]=useState<string>();
  const navigate=useNavigate();

  const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(user?.name && user.phoneNumber && user.email){
      localStorage.setItem("userValue",JSON.stringify(user));
      navigate("/home");
    }
    else{
      setError("Please fill in the form");
    }

    console.log(user);
  }
  return (
    <div 
    style={{
     width:"100%",
     marginTop:"1rem"
   }}>
     <Container 
         component={"main"} 
         maxWidth="xs" 
         sx={{
          height:"100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"}} 
       >
      <Paper
      elevation={3}
      sx={{
        padding:4,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        }}>

        <Typography>Login In</Typography>
      <form onSubmit={submitHandler}>

      <TextField
        // required
        fullWidth
        label="Name"
        margin='normal'
        variant='outlined'
        value={user?.name ||""}
        onChange={(e)=>setUser((prev)=>({...prev!,name:e.target.value}))}
        />
      
      <TextField
        // required
        fullWidth
        type="text"
        label="Phone Number"
        margin='normal'
        variant='outlined'
        value={user?.phoneNumber || "+91 " }
        onChange={e=>setUser(
          (prev)=>({...prev!,phoneNumber:(e.target.value)}
        )
        )}
        // onChange={e=>setUser((prev)=>({...prev!,phoneNumber:Number(e.target.value)}))}
        />    
      <TextField
        // required
        fullWidth
        type="email"
        label="email"
        margin='normal'
        variant='outlined'
        value={user?.email || ""}
        onChange={(e)=>setUser((prev)=>({...prev!,email:e.target.value}))}
        />
        {error &&(
          <Typography color="error" variant="caption" >
          {error}
        </Typography>
        )
        }
      <Button
        sx={{
          marginTop:"1rem"
        }}
        variant='contained'
        color='primary'
        type='submit'
        fullWidth>
          Sign Up
      </Button>
        
      </form>
      </Paper>
      </Container>
    </div>
  )
}

export default Login