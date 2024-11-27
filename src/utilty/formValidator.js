export const formValidator = (rules, value) => {
    console.log(rules.maxLength);
    console.log(value);
    
    let InputIsValid = true;
    if (!rules) return true;
    if (rules.required) {
        InputIsValid = value.trim() != '' && InputIsValid;
    }

    if (rules.maxLength) {
        console.log(rules)
        InputIsValid = value.length <= rules.maxLength.value && InputIsValid;
    }

    return InputIsValid;
}