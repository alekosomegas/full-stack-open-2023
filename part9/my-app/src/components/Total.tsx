import { Courses } from "../types"

const Total = ({courses}: Courses) => {
    return (
    <div>
       <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
    )    
 }
 
 export default Total