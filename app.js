let input=document.querySelector(".text");

const socket=io('https://volleyball-schedule.onrender.com.');
let obj;
let previous;
socket.on("message",message=>{
    document.querySelector(".select").innerHTML="";
    document.querySelector(".schedule").innerHTML="";
    obj=message
    i=0;
    message.week.forEach(day => {
        if(i==previous){
            document.querySelector(".select").innerHTML+="<option value='"+i+"' selected>"+day.data+"</option";
        }else{
            document.querySelector(".select").innerHTML+="<option value='"+i+"'>"+day.data+"</option";
        }
        i+=1;
    });
    
    for(i=0;i<message.week.length;i++){
    dzien=new Date();    
    dzien.setDate(dzien.getDate()+i);
    doc="<div class='day'><header>"+message.week[i].data+" "+dzien.toLocaleDateString("pl-PL", { weekday: 'long' })+"</header><ol>";
    for(j=0;j<message.week[i].persons.length;j++){
        doc+="<li><span>"+message.week[i].persons[j].person+"</span><img src='close.png' onclick='usun("+i+","+j+")'></li>";
    }
    doc+="</li></div>";
    document.querySelector(".schedule").innerHTML+=doc;
}
})

function dodaj(dataIndex,user){
    previous=dataIndex;
    userObj='{"person":"'+user+'"}';
    obj.week[dataIndex].persons[obj.week[dataIndex].persons.length]=JSON.parse(userObj);
    socket.emit('message',obj);
}
function usun(dayIndex,perIndex){
        obj.week[dayIndex].persons.splice(perIndex,1);
        console.log(obj);
    socket.emit('message',obj);
}
input.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        dodaj(document.querySelector(".select").value,input.value);
    }
})