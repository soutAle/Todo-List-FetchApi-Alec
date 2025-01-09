import React from "react";  

export const TodoCounter = ({count}) =>{
    return(
        <div className="list-counter mt-3 text-center fs-5">
            {`${count} Tasks on your List`}
        </div>
    )
}