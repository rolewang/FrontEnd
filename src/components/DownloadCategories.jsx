import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadCategories({localFetchUrl, categoriesList, setTriggerRerender}) {
    

    const [categoryData, setCategoryData] = useState([])
    const csvLink = useRef()

   
    function handleClick(e) {
        if (categoriesList.length > 0) {
            csvLink.current.link.click()
        }
    }
  

   const headers = [
        { label: "name", key: "name" },
        { label: "category_id", key: "category_id" },
        { label: "deadline", key: "deadline" },
        { label: "image", key: "image"}
      ];
             
    let data = [] 

    data = categoriesList.map((category, index) => { return (
      { name: category.name, category_id: category.category_id, deadline: category.deadline, image: category.image }
    )
    })
    


    // console.log(data)












    return(
        <>

<Grid.Column width={4}>
        <Button content='Downloed Categorys.csv' color='facebook' onClick={handleClick} className={ categoriesList.length < 1 ? 'disabled' : null }  />
   
       
        

        <CSVLink
            data={data}
            filename="categorys.csv"
            className='hidden'
            ref={csvLink}
            headers={headers}
            target='_blank'
        />
</Grid.Column>
      </>
    )
}

export default DownloadCategories