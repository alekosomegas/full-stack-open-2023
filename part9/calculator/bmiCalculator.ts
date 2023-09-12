// interface argsBMI {
//     height: number,
//     weight: number
// }

// const parseArgumentsBMI = (args: string[]): argsBMI => {
    
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
  
//     if (!isNaN(Number(args[2] && !isNaN(Number(args[3]))))) {
//         return {height: Number(args[2]), weight: Number(args[3])}
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

export const calculateBmi = (height: number, weight: number) => {
    const bmi: number = weight / ((height/100) * (height/100))
    
    if (bmi < 16) return 'Underweight (Severe thinness)'
    if (bmi < 17) return 'Underweight (Moderate thinness)'
    if (bmi < 18.5) return 'Underweight (Mild thinness)'
    if (bmi < 25) return 'Normal (healthy weight)'
    if (bmi < 30) return 'Overweight (Pre-obese)'
    if (bmi < 35) return 'Obese (Class I)'
    if (bmi < 40) return 'Obese (Class II)'
    return 'Obese (Class III)'

}


// try {
//     const { height, weight } = parseArgumentsBMI(process.argv);
//     console.log(calculateBmi(height, weight))
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }

