import {
  Paper,
} from "@mui/material";

const bar = ( { index, value, marginSize, state } ) => {
  const dictionary = {
    selected: true, 
    greater: "#33cc33",
    smaller: "#ff3300",
    completed: "#009933"
  }
  const height = 250+value*5 + "px"
  return (
    <>
    <Paper id={index} key={index.toString()} className={`bar ${dictionary[state] === true ? "pointer" : ''}`} style={{ height: height,  elevation: 5, margin: marginSize, backgroundColor: dictionary[state] === true ? "#11a8d2" : dictionary[state] ?? "#11a8d2", transition: "all .5s ease", WebkitTransition: "all .5s ease", MozTransition: "all .5s ease" }}><p className="d-flex justify-content-center">{value}</p>
    </Paper>
    </>
  )
}

export default bar