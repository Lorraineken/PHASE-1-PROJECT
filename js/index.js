document.addEventListener('DOMContentLoaded',()=>{
 const formDetails=document.querySelector(`#add-details`)
 console.log(formDetails)

 formDetails.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = e.target.children[2].value
    const instrument =e.target.children[4].value
    const bandName = e.target.children[6].value

    const detailsUpload={
         name:`${name}`,
         band:`${bandName}`
    }

    const configurationObject ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify(detailsUpload)
    }

    if (instrument == 1){
        fetch("http://localhost:3000/pianist",configurationObject)

    }
    else if(instrument == 2){
        fetch("http://localhost:3000/guitarist",configurationObject)

    }
    else if(instrument == 3){
        fetch("http://localhost:3000/drummer",configurationObject)
    }

 })

})

