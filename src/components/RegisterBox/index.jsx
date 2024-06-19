// import React from "react";
// import { Box } from "./styled.jsx";

// export const RegisterBox = () => {
//   return <Box>Registros</Box>;
// };


import { useState } from 'react';

export const RegisterBox = (props) => {
  const [count, setCount] = useState(props.data?.initialCount ?? 0);
 
  return (
    <div>
      <p>Count: {count}</p>
      <button className="nodrag" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
