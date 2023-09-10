const calculateBmi = (height: number, weight: number) => {
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

console.log(calculateBmi(180, 74))