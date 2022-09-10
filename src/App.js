import React, { useState } from "react";
import CheckBox from "./components/check-box/check-box.component";
import './App.css';
import Card from "./components/card/card.component";
class App extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            cars:[],
            checked:false,
            CheckboxedCars:[],
            AppendingCars:[],
            DataisLoaded: false
        };
    }
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch("https://praxesdemo-default-rtdb.firebaseio.com/brands.json")
            .then((res) => res.json())
            .then((json) => {
              const brands=json
              const filteredData = brands.filter(brand => brand !== "" && brand !== null)
                this.setState(()=>{
                  return{items:filteredData, DataisLoaded: true}
                }
                );
            })
        fetch("https://praxesdemo-default-rtdb.firebaseio.com/cars.json")
        .then(res=>res.json())
        .then(car=>this.setState(()=>{
          const filtercars=car.filter(car=> car !== "" && car !== null)
          return {cars:filtercars, CheckboxedCars:filtercars}
        }))
    }

    onChecked=(event)=>{
      
      const selectedBrand = event.target.value
      const checked = event.target.checked 
      
      if(checked){
        const unfilteredCars=this.state.cars.map(car=>{
          if(selectedBrand===car.brand){
            return{
              brand:car.brand,
              model:car.model,
              select: checked
            }
          }
        })
        
        const PreviousCars=this.state.AppendingCars
        const filteredCars=unfilteredCars.filter(car=> car!==undefined)
        
        const AppendedCars=[...PreviousCars,...filteredCars]       
       
        this.setState(()=>{
          return {CheckboxedCars:AppendedCars,AppendingCars:AppendedCars}
        })
      }  
      else{
        const removeCars = this.state.CheckboxedCars.filter(car => car.brand !== selectedBrand)
        
        this.setState(() => {
          if(removeCars.length == 0){
            return {CheckboxedCars:this.state.cars, AppendingCars:removeCars}
          }
          else{
            return {CheckboxedCars:removeCars, AppendingCars:removeCars}
          } 
        })
        
      }
    }

    render() {     
        
        const { DataisLoaded, items, cars, CheckboxedCars, checked } = this.state;

        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
        const isNull = items.brand
        return (
        <div className = "App">
          <hr></hr>
            <h1>Praxes Medical Group</h1>  
            <div className="row">
              {items.map(item=>{
                return(  
                  <div className="col-md-4">
                    <CheckBox value={item} checkedHandler={checked} onChangeHandler={ this.onChecked}/>
                  </div>
                  )
              })}              
            </div>
            <hr></hr>
            <div className="container">
            <table className="table table-light table-hover table-striped table-bordered" cellPadding={10} border={1} align="center">
              <thead>
                  <tr>
                      <th scope="col-md-6"><h5>Brand</h5></th>
                      <th scope="col-md-6"><h5>Model</h5></th>
                  </tr>
                  
              </thead>
              <tbody>
                { CheckboxedCars.map((car) => (<Card car={car} />)) }
              </tbody> 
            </table>
            </div>
        </div>
    );
}
}
   
export default App;