import { PartProps } from "../types";

const Part = ({part}: PartProps) => {
    switch(part.kind) {
        case "basic":
        return (
            <div>
                <p>{part.name}</p> 
                <p>{part.description}</p>   
                <p>{part.exerciseCount}</p>   
            </div>
        )
    case "group":
        return (
            <div>
                <p>{part.name}</p>   
                <p>{part.exerciseCount}</p>   
                <p>{part.groupProjectCount}</p>   
            </div>
        )
    case "background":
        return (
            <div>
                <p>{part.name}</p>   
                <p>{part.description}</p>   
                <p>{part.backgroundMaterial}</p>   
                <p>{part.exerciseCount}</p>   
            </div>
        )
    case "special":
        return (
            <div>
                <p>{part.name}</p>   
                <p>{part.description}</p>   
                <p>{part.exerciseCount}</p>   
                <p>{part.requirements.map(r => <p key={r}>{r}</p>)}</p>   
            </div>
        )
    default:
        return assertNever(part);
    }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
export default Part