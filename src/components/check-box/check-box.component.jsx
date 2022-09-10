import { Component } from "react";
import react, { useState } from 'react';

class CheckBox extends Component{
    render(){
        const {value, onChangeHandler, checkedHandler}=this.props
        
        return(
           <div>
                <input className="form-check-input" type="checkbox" value={value} onChange={onChangeHandler} ></input>
                <label className="form-check-label" htmlFor="flexCheckDefault" >{value}</label>
           </div>           
        )
    }    
}
export default CheckBox;