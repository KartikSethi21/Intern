import { useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Comp1 from "./Comp1";
import  Comp2 from "./Comp2";


function Home() {
    const navigate=useNavigate();
    useEffect(()=>{
        const userValue= localStorage.getItem('userValue');
    if (!userValue) {
        alert("Kindly Fill in the form");
      navigate("/");
    }
    })
  return (
    <div>
       <Comp1/>
       <Comp2/>
    </div>
  )
}

export default Home