import { useState } from 'react';

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = e => setValue(e.target.value)
    const handleFocus = e => e.target.select();

    return { value, onChange: handleChange, onFocus:handleFocus }
}