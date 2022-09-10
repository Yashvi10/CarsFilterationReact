import { Component } from "react";

class Card extends Component{
    render(){
        const {brand,model,select}=this.props.car
        
        return(                 
                
            <tr key={brand}>                    
                <td scope="col-md-6">{brand}</td>
                <td scope="col-md-6">{model}</td> 
            </tr>                                                                  
                                 
        )
    }
}
export default Card;

