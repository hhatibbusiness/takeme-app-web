
export const CalculateAge = ({year, month, day}) => {
    if (!year || !month || !day) return ' ';
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
    }
    return calculatedAge? calculatedAge: ' '
};

export const handleInputChange = (name) => {
    let value = name.replace(/[^\d]/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 4) value = `${value.slice(0, 4)}/${value.slice(4)}`;
    if (value.length > 7) value = `${value.slice(0, 7)}/${value.slice(7)}`;
};
