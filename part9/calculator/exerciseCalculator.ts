interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface MultiplyValues {
    target: number,
    exercises: number[]
}

const parseArguments = (args: string[]): MultiplyValues => {
    
    if (args.length < 10) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');
  
    let target:number
    let exercises:number[] = []

    for (let i:number=2; i < 10; i++) {
        if (!isNaN(Number(args[i]))) {
            if (i === 2) {
                target = Number(args[i])
                continue
            }
            exercises.push(Number(args[i]))
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return {target: target, exercises: exercises}
}

const calculateExercises = (exercises: number[], target: number) : Result => {

    const totalHoursTrained : number = exercises.reduce((acc, curr) => curr + acc, 0)
    const average : number = totalHoursTrained / 7
    const rating: number = average > 3 ? 3 : Math.round(average)

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e > 0).length,
        success: target >= exercises.filter(e => e > 0).length,
        rating: rating,
        ratingDescription: rating == 1 ? 'bad' : 'not too bad but could be better',
        target: target,
        average: average
    }
}

try {
    const { target, exercises } = parseArguments(process.argv);
    console.log(calculateExercises(exercises, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }