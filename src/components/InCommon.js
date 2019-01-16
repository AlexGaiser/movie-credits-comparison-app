import React,{Component} from 'react';

class InCommon extends Component{
        constructor(props) {
            super(props)
            this.state={inCommon:''
        } 
    }
    componentDidMount=(props)=>{
        if(this.props.allCredits) {console.log(props)}
        else{console.log( 'waiting')} 
    }
  
    renderInCommon=(search1,search2)=>{
        console.log('running')
       console.log(search1)
       this.setState({ 
           inCommonCast:search1.castCredits.map((item)=>{
           for (let value of search2.castCredits){
            if (item.props.id === value.props.id){
                return item
            }
           }
       }).filter(item=>item),
           inCommonCrew: search1.crewCredits.map((item)=>{
            for (let value of search2.crewCredits){
             if (item.key === value.key){
                 return item
             }
            }
        }).filter(item=>item)
    })
}
    render(){
        
        return(
            <div>
                <h3>{this.props.title}</h3>
    
                <button onClick={()=>{
                    this.renderInCommon(this.props.allCredits.search1,this.props.allCredits.search2)}}>Common</button> 
    <h3>Common Cast Credits</h3>
    <ul>{this.state.inCommonCast}</ul>
    <h3>Common Crew Credits</h3>
    <ul>{this.state.inCommonCrew}</ul>
    {/* ?inCommon:'in common'}</ul> */}
    </div>
        )
    }
}


export default InCommon