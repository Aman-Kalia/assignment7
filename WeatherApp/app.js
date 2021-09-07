
function t(){
    const p_time=document.getElementById('time');
    const p_date=document.getElementById('date');
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    const monthNumber = today.getMonth();
    const monthName = monthNames[monthNumber];
    var weekdayNumber = today.getDay();
    var weekdayName = arrayOfWeekdays[weekdayNumber];
    var date=today.getDate()+" "+monthName+" ("+ weekdayName+"), " +today.getFullYear();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    p_time.innerHTML=time;
    p_date.innerHTML=date;
    setTimeout(t,500);
}

t();
const city=document.getElementById('city');
const maintemp=document.getElementById('maintemp');
const mm=document.getElementById('mm');
let desp=document.getElementById('desp');
const icon=document.querySelector('i');
let temp,c,cmax,cmin,d1;
// const btnupdate=document.querySelector('button["type=submit"]');
const inputField= document.querySelector('input');
inputField.addEventListener("keypress",e =>{
    if(e.key=="Enter"&& inputField.value!=""){
        requestApi(inputField.value);
        city.innerHTML=inputField.value;
        inputField.value="";
    }
});
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    requestApi(inputField.value);
    city.innerHTML=inputField.value;
    inputField.value="";
});
// btnupdate.addEventListener("click",e=>{
//     requestApi(inputField.value);
// });
function change(d1){
    if(d1=="clear sky"|| d1=="sunny"){
        icon.className="fas fa-sun";
        // document.body.style.backgroundImage= linear-gradient(to right,#5433FF, #20BDFF,#A5FECB);
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VubnklMjBkYXl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
    }
    else if(d1=="broken clouds"|| d1=="overcast clouds"|| d1=="scattered clouds"){
        icon.className="fas fa-cloud";
        document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1532178910-7815d6919875?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    }
    else if(d1=="mist"|| d1=="fog"|| d1=="haze"){
        icon.className="fas fa-smog";
        document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1496399916416-0dd6beb3aab3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGZvZ2d5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    }
    else if(d1=="thunderstorm"){
        icon.className="fas fa-thunderstorm";
        document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1457528877294-b48235bdaa68?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHRodW5kZXJzdG9ybXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    }
    else if (d1=="raining"|| d1=="moderate rain"|| d1=="light rain"|| d1=="light intensity drizzle"|| d1=="thunderstorm with heavy rain"){
        icon.className="fas fa-cloud-showers-heavy";
        document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1524813445246-21c59abc2517?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fHJhaW5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    }
}
function weatherdescription(d1){
    desp.innerHTML=d1;
}
function printtemp(c,cmax,cmin){
    // desp.innerHTML=desp;
    maintemp.innerHTML=c+"*C";
    mm.innerHTML=cmax+"*C(max)/ "+cmin+"*C(min)";
    
}
function requestApi(city){
    let api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c073c7f8376dc4dd36cca6c22ffd3d4d`;
    fetch(api)
        .then((res) => {
           return res.json()
        })
        .then((data) => {
           temp=data.main.temp;
           cmax=data.main.temp_max;
           cmax=cmax-273.15;
           cmin=data.main.temp_min;
           cmin=cmin-273.15;
            c = temp- 273.15;
            d1=data.weather[0].description;
           console.log(data);
        //    console.log(cmax);
        //    console.log(desp);
            // print(desp);
            // desp.innerHTML=d1;
            weatherdescription(d1);
            change(d1);
            printtemp(Math.round(c),Math.round(cmax),Math.round(cmin));
        })
        .catch((err) => {
            alert("Enter Valid Name");
           console.log(err.message);
        });
}
