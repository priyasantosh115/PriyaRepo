import React,{ Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button, Dropdown, Pagination } from 'semantic-ui-react';

export default class Customer extends Component{
    constructor(props){
        super();
        this.state={data:[],loading:true,id:0,selectedItem:10,currentPage:1};
    }  

    options=[
            {key:1,text:"5",value:5},
            {key:2,text:"10",value:10},
            {key:3,text:"20",value:20},
            {key:4,text:"30",value:30}
    ];

    onDropdownChangeEvent=(event,{value})=>{
        this.populateCustomerData();
        this.setState({selectedItem:{value},currentPage:1});
    };

    onPageChange=(event,dat)=>{
        this.populateCustomerData();
        this.setState({currentPage:dat.activePage,
        });
    };

    componentDidMount(){
        this.populateCustomerData();
    }
 
    populateCustomerData(){
        axios.get('https://priyankaapp.azurewebsites.net/Customer/GetCustomer')
        .then((result) =>{
            console.log(result.data);
            this.setState({
              data:result.data,loading:false});
        }).catch((error) =>{
            console.log(error);
        });
    }
    
    componentWillMount(){
        console.log("DidMount");
    }
    
    componentWillUnmount(){        
        console.log("DidUnMount");
    }
      
    render(){
        let items = this.state.loading 
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.data);

        return(
          <div>
              <h1 id="tableLabel">Customer</h1>
              <p>This Component fetches customer data from server.</p>
              <p>
                  <Link to="/createcustomer">Create New Customer</Link>
              </p>
              { items }
          </div>  
        );
    }

    renderCustomerTable(data){ 
        var options=this.state.data
        return(
            <table class="ui celled padded table">
                <thead>
                    <tr>
                        <th className="single line"></th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map(item=>
                        <tr key={item.Id}>
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>
                                <Link to={"/updatecustomer?id="+ item.id} className="btn btn-success">Edit</Link>
                            </td>
                            <td>
                                <Button negative onClick={(id)=>this.handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>                    
                    <tr>
                        <th></th>
                        <th colSpan="1"></th>
                        <th colSpan="5">
                           <div>
                            <Dropdown
                                placeholder='select'
                                options={options}
                                onChange={this.onDropdownChangeEvent}
                            /></div>
                            <div>
                                <Pagination 
                                    id="sidepage"
                                    defaultActivePage={1}
                                    totalPages={this.onPageChange}
                                    onPageChange={this.onPageChange}
                                />
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    }
    
    handleDelete(id){
        if(!window.confirm("Do you want to delete this record ?"+id)){
            return;
        }
        else{
            fetch('https://priyankaapp.azurewebsites.net/Customer/Delete/'+id,{
                method:'POST',
                headers:{'Content-Type':'application/json'}
            })
            .then(datas=>{
                this.setState({
                    datas: this.state.data.filter((rec)=>{
                        return rec.Id !== id;
                    })
                });
                this.props.history.push('/customer')
            });
        }
    }           
}
