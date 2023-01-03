/*
The form for adding instrumentalists only works when using db1.json 

 To use db1.json for full functionality of the application make the following changes
 1. Replace the URLs i.e with your local host URLs 
    e.g const pianistURL= "http://localhost:3000/pianist";
        const guitaristURL = "http://localhost:3000/guitarist";
        const drummerURL ="http://localhost:3000/drummer"
        const bandListURL="http://localhost:3000/bandsList"
 2.Check comments within the code written replace or comment out and make the necessary changes
*/ 


document.addEventListener('DOMContentLoaded',()=>{
    
 addNewInstrumentalist() 
 dropDownMenu()
 addBandList()
 displayBandDetails()

})
 
// fetch URLs
// const pianistURL ="https://lorraineken.github.io/server/pianist.json"
// const guitaristURL="https://lorraineken.github.io/server/guitarist.json"
// const drummerURL ="https://lorraineken.github.io/server/drummer.json"
// const bandListURL="https://lorraineken.github.io/server/bands.json"

const pianistURL= "http://localhost:3000/pianist";
const guitaristURL = "http://localhost:3000/guitarist";
const drummerURL ="http://localhost:3000/drummer"
const bandListURL="http://localhost:3000/bandsList"



const bandNames=[]

// Adding details of new instrumentalist
function addNewInstrumentalist(){

    const formDetails=document.querySelector(`#add-details`)
 console.log(formDetails)

 formDetails.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = e.target.children[2].value
    const instrument =e.target.children[4].value
    const bandName = e.target.children[6].value
    const contactInfo =e.target.children[8].value
    const socialHandle =e.target.children[10].value

    const detailsUpload={
         name:`${name}`,
         band:`${bandName}`,
         contact: `${contactInfo}`,
         socialMedia:`${socialHandle}`
    }

    const configurationObject ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
        },
        body: JSON.stringify(detailsUpload)
    }

    

    if (instrument == 1){
        fetch(pianistURL,configurationObject)

    }
    else if(instrument == 2){
        fetch(guitaristURL,configurationObject)

    }
    else if(instrument == 3){
        fetch(drummerURL,configurationObject)
    }

 })
}

//Dropdown details for the instrumentalist

function dropDownMenu(){
    const pianoPlayer=document.getElementById("piano")
    const guitarPlayer=document.getElementById("guitar")
    const drumPlayer=document.getElementById("drummer")
    const pianistBtn=document.getElementById('pianist-button')
    const guitaristBtn =document.getElementById('guitarist-button')
    const drummerBtn = document.getElementById('drummer-button')

     //Adding click on pianists names to display individual details
    pianistBtn.addEventListener('click',()=>{
        fetch(pianistURL)
        .then((response) => response.json())
        .then((pianistDetails) =>{                        //replace data with pianistDetails
            //const pianistDetails=data.pianist  //comment out 
            const pianistNames=[]
            const pianistBand=[]   
            for(item of pianistDetails){
                pianistNames.push(item.name)
                pianistBand.push(item.band)
            }
            for(let x=0;x<pianistNames.length;x++){
                const li =document.createElement('li')
                li.innerText = pianistNames[x]
                li.addEventListener("click",()=>{
                    p=document.createElement('p')
                    p.innerText=`Band name:${pianistBand[x]}`
                    li.appendChild(p)
                })
                pianoPlayer.appendChild(li)
            }
        })
    })

    // Adding click on guitarists names to display individual details
    guitaristBtn.addEventListener('click',()=>{
        fetch(guitaristURL)
        .then((response) => response.json())
        .then((guitaristDetails) =>{                            //replace data with guitaristDetails
            //const guitaristDetails=data.guitarist  //comment out
            const guitaristNames=[]
            const guitaristBand=[]   
            for(item of guitaristDetails){
                guitaristNames.push(item.name)
                guitaristBand.push(item.band)
            }
            for(let x=0;x<guitaristNames.length;x++){
                const li =document.createElement('li')
                li.innerText = guitaristNames[x]
                li.addEventListener("click",()=>{
                    p=document.createElement('p')
                    p.innerText=`Band name:${guitaristBand[x]}`
                    li.appendChild(p)
                })
                guitarPlayer.appendChild(li)
            }
        })
    })

     // Adding click on drummer names to display individual details
    drummerBtn.addEventListener('click',()=>{
        fetch(drummerURL)
        .then((response) => response.json())
        .then((drummerDetails) =>{                             //Replace data with drummerDetails
           // const drummerDetails=data.drummer       //comment out
            const drummerNames=[] 
            const drummerBand=[] 
            const drummerContact=[]
            const drummerSocialHandle=[] 
            for(item of drummerDetails){
                drummerNames.push(item.name)
                drummerBand.push(item.band)
                drummerContact.push(item.contact)
                drummerSocialHandle.push(item.socialMedia)
            }
            for(let x=0;x<drummerNames.length;x++){
                const li =document.createElement('li')
                li.innerText = drummerNames[x]
                li.addEventListener("click",()=>{
                   const p=document.createElement('p')
                   const p1=document.createElement('p')
                   const p2=document.createElement('p')
                    p.innerText=`Band name:${drummerBand[x]}`
                    p1.innerText=`Contact:${drummerContact[x]}`
                    p2.innerText=`SocialMedia: ${drummerSocialHandle[x]}`
                    li.appendChild(p)
                    li.appendChild(p1)
                    li.appendChild(p2)
                })
                drumPlayer.appendChild(li)
            }
        })
    })


}

//Display names of bands available

function addBandList(){
    const displayBand =document.getElementById('band-names')

    fetch(bandListURL)
    .then((response) => response.json())
    .then((bandDetails) => {                              //replace bandData with bandDetails
        //const bandDetails=bandData.bandsList           //comment out
        for(info of bandDetails){
            bandNames.push(info.name)
        }
        for(let i=0;i<bandNames.length;i++){
            const bName =document.createElement('p')
            const likeBtn=document.createElement('button')

            //Add likes to bands
            let like=0
            likeBtn.innerText=`${like} likes`
            likeBtn.addEventListener("click",()=>{
                likeBtn.innerText=`${++like} likes`
            })
            bName.innerText=`${i+1}. ${bandNames[i]}`
            bName.append(likeBtn)
            displayBand.appendChild(bName)

        }   
    })
}


//Display band details after search

function displayBandDetails(){
    const searchForm=document.getElementById("search-Band")

    searchForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        const searchInput = e.target.children[0].value

        const foundBand = bandNames.find((item)=> item===searchInput)

        if (foundBand){
            fetch(bandListURL)
            .then((response) => response.json())
            .then((bandDetails) => {                              //replace data with bandDetails
               // const bandDetails=data.bandsList           //commentout
                for(let i=0;i<bandNames.length;i++){
                    if(foundBand === bandNames[i]){
                        const details=bandDetails[i]

                    const display=document.getElementById("displayBand-details")
                    const bandName =document.createElement('p')
                    const about =document.createElement('p')
                    const members =document.createElement('p')
                    const pastEvents =document.createElement('p')
                    const upcomingEvents =document.createElement('p')

                    bandName.innerText=`Band name: ${details.name}`
                    about.innerText=`About: ${details.about}`

                    // display members details
                    const mem=details.members
                    function membersObj(memObj = mem){
                        membersArray=[]
                        Object.entries(memObj).forEach(([key,value]) => {
                            const member=`${key}:${value}`
                            membersArray.push(member)
                        })
                        members.innerText=`Members: ${membersArray}`
                    }

                    //display pastEvents

                    const pEvents=details.past_events
                    function pastEventsObj(pastObj = pEvents){
                        pastEventArray=[]
                        Object.entries(pastObj).forEach(([key,value]) => {
                            const event=`${key}:${value}`
                            pastEventArray.push(event)
                        })
                        pastEvents.innerText=`Past Events: ${pastEventArray}`
                    }
                   
                    //display upcoming events
                    const upEvents=details.upcoming_events
                    function upcomingEventsObj(upObj = upEvents){
                        upcomingEventsArray=[]
                        Object.entries(upObj).forEach(([key,value]) => {
                            const event=`${key}:${value}`
                            upcomingEventsArray.push(event)
                        })
                        upcomingEvents.innerText=`Upcoming Events: ${upcomingEventsArray}`
                    }
                   
                    

                    display.appendChild(bandName)
                    display.appendChild(about)
                    membersObj()
                    display.appendChild(members)
                    pastEventsObj()
                    display.appendChild(pastEvents)
                    upcomingEventsObj()
                    display.appendChild(upcomingEvents)
                        
                    }

                }
            })
        }

 

    })

}