import { Courses } from "../types"

const Content = (props: Courses) => {
    return (
        <div>
            {props.courses.map(c => 
                <p key={c.name}>{c.name} {c.exerciseCount}</p>
                )}
        </div>
    )    
 }
 
 export default Content