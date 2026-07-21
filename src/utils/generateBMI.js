/**
 * Calculates BMI from weight (kg) and height (cm)
 * 
 * @param {number} weightKg 
 * @param {number} heightCm 
 * @returns {object} BMI value and category
 */
export const calculateBMI = (weightKg, heightCm) => {
    if (!weightKg || !heightCm) return null;
    
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi < 24.9) category = 'Normal weight';
    else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
    else category = 'Obese';
    
    return {
        value: Number(bmi.toFixed(1)),
        category
    };
};

export default calculateBMI;
