/**
 * Calculates the current week of pregnancy based on the Last Menstrual Period (LMP) date or Due Date.
 * 
 * @param {string|Date} date - The reference date
 * @param {boolean} isDueDate - If true, calculates backwards from due date, otherwise forwards from LMP
 * @returns {number} The current week of pregnancy (1-40)
 */
export const calculatePregnancyWeek = (date, isDueDate = false) => {
    if (!date) return 1;

    const referenceDate = new Date(date);
    const today = new Date();
    
    // Reset times to midnight for accurate day calculation
    referenceDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - referenceDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let weeks;
    if (isDueDate) {
        // Due date is exactly 40 weeks (280 days) from LMP
        const daysPregnant = 280 - (Math.ceil((referenceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        weeks = Math.floor(daysPregnant / 7);
    } else {
        // LMP calculation
        weeks = Math.floor(diffDays / 7);
    }
    
    // Bound the result between week 1 and week 42
    if (weeks < 1) return 1;
    if (weeks > 42) return 42;
    
    return weeks;
};

export default calculatePregnancyWeek;
