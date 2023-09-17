import {PartProps, Courses} from "../types"
import Part from "./Part"

const Content = ({courses}: Courses): JSX.Element => {
    return (
        <div>
            {courses.map(p => <Part key={p.name} part={p} />)}
        </div>
    )    
 }
 
 export default Content