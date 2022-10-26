import { Button } from 'antd';
import { Spin } from 'antd';
import Search from 'antd/lib/transfer/search';
import { useState, useEffect } from 'react';
import './App.css';

var id = "61bf209bdb079818ec63d9fd";
function App() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [prevsearch, setPrevSearch] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search?query=hello&page=0')
    .then(res => {
        return res.json();
        setIsLoading(false);  
    })
    .then(data => {
        console.log(data.hits[0]);
        setData(data.hits);
    })

}, [])

const handleInputChange = (e) => {
  setQuery(e.target.value)
  setPrevSearch([query,...prevsearch])
  const fData = ()=>{
    data.filter(element => {
      return element.title.toLowerCase().includes(query.toLowerCase());
    });
  }
  setFilteredData(fData )
  this.filterArray();
}

const Search=(val)=>{
  const fData = ()=>{
    data.filter(element => {
      return element.title.toLowerCase().includes(val.toLowerCase());
    });
  }
  setFilteredData(fData)
}

const deleteItem = (index) => {
  FilteredData.splice(index, 1);
  setFilteredData(FilteredData);
};



  return (
  <>
    <div>
      <h1>My Hacker Stories</h1>
    </div>
    <div style={{}}>
      <h3>Search: 
      <input type='text' placeholder='Input text here' style={{marginLeft:'6px'}}/>
      <Button style={{marginLeft:'6px'}} onSubmit={handleInputChange}>Submit</Button>
      </h3>
    </div>
    <span>
      {prevsearch.map(i => <Button onClick={Search(i)}>{i}</Button>)}
    </span>
    <div>
    {
      isLoading ? <Spin />:
      FilteredData.map(i => <p>{i.title + '' +i.author}<a>{i.title}</a><Button onClick={deleteItem}>Dismiss</Button></p>)}
    </div>
  </>
  );
}

export default App;
