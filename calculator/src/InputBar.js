import React from "react";
import { Input } from "semantic-ui-react";

function InputBar(props) {
  return(
    <Input 
    fluid
    className="input-bar"
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    />
  );
}

export default InputBar;