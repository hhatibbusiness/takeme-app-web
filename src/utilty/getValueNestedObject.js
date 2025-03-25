export default function getValueNestedObject(object, keyPath) {
    console.log(keyPath.split('.').reduce((current, key) => {
        // If current value is an array, loop through it
        console.log()
        if (Array.isArray(current)) {
            for (let item of current) {
                const value = item?.[key];
                if (value !== undefined) {
                    return value;
                }
            }
            return undefined;
        }
        return current?.[key];
    }, object))
    return keyPath.split('.').reduce((current, key) => {
        // If current value is an array, loop through it
        console.log()
        if (Array.isArray(current)) {
            for (let item of current) {
                const value = item?.[key];
                if (value !== undefined) {
                    return value;
                }
            }
            return undefined;
        }
        return current?.[key];
    }, object);
}
