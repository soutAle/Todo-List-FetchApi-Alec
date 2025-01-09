import React from "react";

export const TodoInput = ({inputValue, setInputValue, onAdd}) => {
    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && inputValue.trim() !== "") onAdd();
    }

    return(
        <input 
            className="input-tasks" 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Next Task"
            aria-label="Next Task" 
        />
    )
}