window.onload = initAll;

var req = new XMLHttpRequest();

var username = new Array ("");
var usercount = new Array ("");

function initAll() {

    //this is line run the aotoGen function
    document.getElementById('Afil').addEventListener("click", autoGen);
//this line run the validet function on submit buttom.
    document.getElementById("myForm").addEventListener("submit",validateForm);
    
//this part is use to run validet function for radio box 
    var myTextTags = document.getElementsByTagName("INPUT");
    
    for (i = 0; i < myTextTags.length; i++) {
        myTextTags[i].onblur = validateForm;
        if (myTextTags[i].className == "bkcolor" || myTextTags[i].className == "txcolor") {
            myTextTags[i].onchange = validateForm;
        }
    }
    //this line run getdata function on submit buttom.
    document.getElementById('myForm').addEventListener("submit",getdata);
    getdata();
    
    
    //alert(localStorage.userchoice);
    
   
    //OpenStyle();
    
    
    }

//This function fill the form 
function autoGen() {

    var myfirst = new Array("aziz", "lax", "jim", "johne", "ali", "rose", "max", "jamal", "omer", "marco");

    var mylast = new Array("ameri", "manzi", "martin", "andrson", "rich", "tomson", "ramzi", "busco", "martinez", "vandilet");

    var myemail = new Array("ameri@gamil.com", "lax_manzi@gmail.com", "johne1986@yahoo.com", "mr.rich@hotmail.com", "ramzi86@yahoo.com", "rose_love@msn.com", "max_crezy@live.com", "mr.boomba@aol.com", "martn_j@live.com", "vandilet@msn.com");

    var myyear = new Array("1956", "1978", "1963", "1974", "1989", "2012", "1930", "1954", "1965", "1986");

    var mysubject = new Array("delenit", "feugait vulputat", "hendrerit", "ullamcorper", "minim nonummy ", "dolore blandit", "luptatum ", "nostrud", "Adipiscing", "suscipit");

    var myblog = new Array("Esse in dolore at delenit dolor, duis, dignissim, et commodo duis", "consequat nisl delenit dolore ea minim, elit facilisis.", "Quis te, eum feugait vulputate in feugait, nulla eu ea illum volutpat autem exerci", " nonummy consequat minim feugiat hendrerit duis molestie vulputate wisi enim.", "Adipiscing te nulla enim iriure qui ut eum, exerci", "vero velit iriure tincidunt, nonummy", "veniam et duis ipsum erat accumsan minim.", " Delenit qui feugait in, ex minim vero ullamcorper", "nulla ex ipsum enim in, zzril wisi elit consequat exerci", "nostrud vero eros duis  wisi ut suscipit et.")



    var gen = Math.floor(Math.random() * myfirst.length);
    var geny = Math.floor(Math.random() * myyear.length);
    var gens = Math.floor(Math.random() * mysubject.length);
    var genb = Math.floor(Math.random() * myblog.length);
    


    document.getElementById('fname').value = myfirst[gen];
    document.getElementById('lname').value = mylast[gen];
    document.getElementById('email').value = myemail[gen];
    document.getElementById('year').value = myyear[geny];

    var monthGen = Math.ceil(Math.random() * 12);

    var dayGen = Math.ceil(Math.random() * 28);

    var bkGen = Math.floor(Math.random() * 4);

    var txGen = Math.floor(Math.random() * 5);

    document.getElementById('month').selectedIndex = monthGen;

    document.getElementById('day').selectedIndex = dayGen;

    var mybk = document.getElementsByClassName('bkcolor');

    var mytx = document.getElementsByClassName('txcolor');

    mybk[bkGen].checked = true;

    mytx[txGen].checked = true;

    document.getElementById('subject').value = mysubject[gens];
    document.getElementById('blog').value = myblog[genb];




}


//this function cap the fist and last name
function fixnames(myname) {
    var firstchar = myname.charAt(0);
    var endofname = myname.substring(1, myname.length);
    var fixedname = firstchar.toUpperCase() + endofname.toLowerCase();
    return fixedname;

}

//this function validet the form
function validateForm() {
    firstRun();

    yearCk = /^\d{4}$/
    nameck = /^[a-zA-Z]+$/
    emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

    var fName = document.getElementById('fname').value;
    var lName = document.getElementById('lname').value;
    var Email = document.getElementById('email').value;
    var iyear = document.getElementById('year').value;
    var mysubject = document.getElementById('subject').value;
    var iblog = document.getElementById('blog').value;
    var Month = document.getElementById('month');
    var Day = document.getElementById('day');
    var allinput = document.getElementsByTagName('INPUT');

    if (!nameck.test(fName)) {
        document.getElementById("fNameError").innerHTML = "Enter first name!";
        document.getElementById("fNameError").style.color = "red";
        document.getElementById("fname").style.border = "solid thin red";
        return false;
    } else {
        document.getElementById("fNameError").innerHTML = "&#10004;";
        document.getElementById("fNameError").style.color = "green";
        document.getElementById("fname").style.border = "solid thin green";
        var fname1 = document.getElementById('fname').value;
        document.getElementById('fname').value = fixnames(fname1);


    }

    if (!nameck.test(lName)) {
        document.getElementById("lNameError").innerHTML = "Enter last name!";
        document.getElementById("lNameError").style.color = "red";
        document.getElementById("lname").style.border = "solid thin red";
        return false;
    } else {
        document.getElementById("lNameError").innerHTML = "&#10004;";
        document.getElementById("lNameError").style.color = "green";
        document.getElementById("lname").style.border = "solid thin green";
        var lname1 = document.getElementById('lname').value;
        document.getElementById('lname').value = fixnames(lname1);

    }
    if (Email == "") {
        document.getElementById('emailError').innerHTML = "Enter your Email!";
        document.getElementById('emailError').style.color = "red";
        document.getElementById('emailError').style.border = "solid thin red";
        return false;
    }

    if (!emailRe.test(Email)) {
        document.getElementById('emailError').innerHTML = "Enter a valid Email! ";
        document.getElementById('emailError').style.color = "red";
        document.getElementById('emailError').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('emailError').innerHTML = "&#10004;";
        document.getElementById('emailError').style.color = "green";
        document.getElementById('emailError').style.border = "solid thin green";
    }

    if (Month.options[Month.selectedIndex].value == "") {
        document.getElementById('yearError').innerHTML = "select a month";
        document.getElementById('yearError').style.color = "red";
        document.getElementById('month').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('month').style.border = "solid thin green";

    }

    if (day.options[day.selectedIndex].value == "") {
        document.getElementById('yearError').innerHTML = "select a day!";
        document.getElementById('yearError').style.color = "red";
        document.getElementById('day').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('day').style.border = "solid thin green";

    }




    if (!yearCk.test(iyear)) {
        document.getElementById('yearError').innerHTML = "Enter a four digit for year";
        document.getElementById('yearError').style.color = "red";
        document.getElementById('year').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('yearError').innerHTML = "&#10004;";
        document.getElementById('yearError').style.color = "green";
        document.getElementById('year').style.border = "solid thin green";

    }

    var bgnum = -1;
    var textnum = -1;




    for (i = 0; i < allinput.length; i++) {
        if (allinput[i].className == "bkcolor") {
            if (allinput[i].checked) {
                bgnum = i;
            }
        }

        if (allinput[i].className == "txcolor") {
            if (allinput[i].checked) {
                textnum = i;
            }
        }
    }


    if (bgnum == -1) {
        document.getElementById('bgError').innerHTML = "Background Color: choose a color for background!";
        document.getElementById('bgError').style.color = "red";
        return false;
    } else {
        document.getElementById('bgError').innerHTML = "BackGround Color : &#10004; ";
        document.getElementById('bgError').style.color = "green";

    }


    if (textnum == -1) {
        document.getElementById('textError').innerHTML = "Text Color: choose a color for text!";
        document.getElementById('textError').style.color = "red";
        return false;
    } else {
        document.getElementById('textError').innerHTML = "Text Color : &#10004; ";
        document.getElementById('textError').style.color = "green";
    }



    if (mysubject == "") {
        document.getElementById('inote').innerHTML = "Write something: !!! ";
        document.getElementById('inote').style.color = "red";
        document.getElementById('subject').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('inote').innerHTML = "Subject : &#10004; ";
        document.getElementById('inote').style.color = "green";
        document.getElementById('subject').style.border = "solid thin green";

    }



    if (iblog == "") {
        document.getElementById('iErroe').innerHTML = "Write something: !!! ";
        document.getElementById('iErroe').style.color = "red";
        document.getElementById('blog').style.border = "solid thin red";
        return false;
    } else {
        document.getElementById('iErroe').innerHTML = "Write something:  &#10004 ";
        document.getElementById('iErroe').style.color = "green";
        document.getElementById('blog').style.border = "solid thin green";
    }

return false;
    
}


//this function use to check the form and change the style 

function firstRun() {
    document.getElementById("fNameError").innerHTML = "Enter first name!";
    document.getElementById("fNameError").style.color = "red";
    document.getElementById("fname").style.border = "solid thin red";

    document.getElementById("lNameError").innerHTML = "Enter last name!";
    document.getElementById("lNameError").style.color = "red";
    document.getElementById("lname").style.border = "solid thin red";


    document.getElementById('emailError').innerHTML = "Enter your Email!";
    document.getElementById('emailError').style.color = "red";

    document.getElementById('emailError').style.border = "solid thin red";

    document.getElementById('yearError').innerHTML = "select a month";
    document.getElementById('yearError').style.color = "red";
    document.getElementById('month').style.border = "solid thin red";

    document.getElementById('bgError').innerHTML = "Background Color: choose a color for background!";
    document.getElementById('bgError').style.color = "red";

    document.getElementById('textError').innerHTML = "Text Color: choose a color for text!";
    document.getElementById('textError').style.color = "red";

    document.getElementById('inote').innerHTML = "Write something: !!! ";
    document.getElementById('inote').style.color = "red";
    document.getElementById('subject').style.border = "solid thin red";

    document.getElementById('iErroe').innerHTML = "Write something: !!! ";
    document.getElementById('iErroe').style.color = "red";
    document.getElementById('blog').style.border = "solid thin red";
}


//this is the ajax function.
/* Ajax engine is currentry offline  
function getdata()
{
    var fName = document.getElementById('fname').value;
    var lName = document.getElementById('lname').value;
    var Email = document.getElementById('email').value;
    var iyear = document.getElementById('year').value;
    var mysubject = document.getElementById('subject').value;
    var iblog = document.getElementById('blog').value;
    var Month = document.getElementById('month');
    var Day = document.getElementById('day');
    var allinput = document.getElementsByTagName('INPUT');
       
    var poststr = "";
    var num = -1;
    
    
    poststr = "fname=" + encodeURI(fName); 
    poststr += "&lname=" + encodeURI(lName);
    poststr += "&email=" + encodeURI(Email);
    poststr += "&month=" + encodeURI(Month.options[Month.selectedIndex].value);
    poststr += "&day=" + encodeURI(Day.options[Day.selectedIndex].value);
    poststr += "&year=" + encodeURI(iyear);

        for (i = 0; i < allinput.length; i++) 
        {
            if (allinput[i].className == "bkcolor") 
            {
                if (allinput[i].checked)
                {
                    poststr += "&bkcolor=" + encodeURI(allinput[i].value) + "&";
                    num++
                }
            }

            if (allinput[i].className == "txcolor")
            {
                if (allinput[i].checked) 
                {
                    poststr += "txcolor=" + encodeURI(allinput[i].value) + "&";
                    num++
                }
            }
            
        }
    poststr += "subject=" + encodeURI(mysubject);
    poststr += "&blog=" + encodeURI(iblog);
    poststr += "&senddata=yes";
    
    //alert(poststr);
   // alert("hllo"); 
   // alert(num);
    
    if(num != -1)
    {   
    req.open("POST","data.php",true);    
    req.onreadystatechange = useResponse;
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.send(poststr);
    //document.getElementById('myform').reset();    
    //return false;
    }
    
    
    else
    {
    req.open("GET","data.php",true);
    req.onreadystatechange = useResponse;
    req.send(null);        
    return false;
            
    }


}


function useResponse()
{
    if(req.readyState == 4)
        {
            if(req.status == 200)
            {
                    document.getElementById('mydiv').innerHTML = req.responseText;
                    
                    //using golabel var
                    myclick = document.getElementById('collapse');
                    
                     myrow = document.getElementsByClassName('rowtwo');
                    
                    myclick.onclick = runStyle;
                                        
                    var dellink = document.getElementsByClassName('delete');
                    for(i=0; i<dellink.length ;i++)
                        {
                            dellink[i].onclick = rundata;
                        }
                    
                    //using the localStorage to remember user choise.
                    if(localStorage.userchoice == "Open")
                        {
                        for(i=0 ; i< myrow.length ; i++)
                        {
                        myrow[i].style.display = "none";
                        }
                        myclick.innerHTML = "Open";
                        } 
                    
                    username.length = 0;
                    usercount.length = 0;
                    
                    var myuser = document.getElementsByClassName('username');
                    var mycount = document.getElementsByClassName('usercount');
                    
                    for(i=0; i< myuser.length ; i++)
                    {
                        username[i] = myuser[i].innerHTML;                                    
                    }
                    for(i=0 ; i<mycount.length; i++)
                    {
                        usercount[i] = mycount[i].innerHTML;                            
                    }
                    
                    drawchart()
                
                 mylink = document.getElementsByClassName('message');
                for(i=0 ; i<mylink.length; i++)
                    {
                        mylink[i].onclick = getid;
                        
                    }
                    
                
                    
                }
        }
}

*/
  /* This function is used to show the data on the page */
/*
function getid()
{
    var myid = "id" + this.id;
    var sms;
    
    sms = document.getElementById(myid).innerHTML;
            
    document.getElementById('sms').innerHTML = sms;
    
        
}


function rundata()
{
    if(confirm("Do you want to delete this record ?"))
    {
            
        
    if(this.href)
        {
            var myurl = this.href;
        }
    else
        {
            var myurl = "data.php";
        }
        
    req.open("get",myurl,true);
    req.onreadystatechange = useResponse;
    req.send(null);
    return false;
    }
    else{
        return false;
    }
}




function runStyle()
{
    
   
    
        for(i=0; i<myrow.length; i++)
        {
            
            
            if(myrow[i].style.display == "block")
                {    
                    myrow[i].style.display = "none";
                    localStorage.userchoice = "Open";
                    myclick.innerHTML = "Open";
                   // alert(localStorage.userchoice);

                }
            else
                {
                   
                    
                    myrow[i].style.display = "block";
                    localStorage.userchoice = "Close";
                    myclick.innerHTML = "Close";
                   // alert(localStorage.userchoice);
                }

            
        }

}

*/

/*This is the canves function*/
/*

function drawchart()
{
    var myimg = document.getElementById('mycanvas').getContext('2d');
myimg.fillStyle = "white";
myimg.fillRect(0, 0, 500, 500); /*this line right here clears the chart with white where 500 x 500 is the size of the canvas*/

  /* ------------      
var myimg = document.getElementById('mycanvas').getContext('2d');
var fontS = '14';
myimg.font = fontS+'px Arial';
var fontX = 10; /*all text starts 10 pixels in
var fontY = 30; /*the first text starts 30 pixels down
var rectH =  5; /* all rectangles are 5 pixels tall
var rectX = 115;  /* all rectangles start 80 pixels in (so they don't run into the text
   
    
	for(i=0; i<username.length; i++)
	{
        
	var rectY = (fontY - fontS) + rectH + 1; /*this attempts to center rectangle on text
	myimg.fillStyle = "blue";
	myimg.fillText(username[i],fontX, fontY);
    var grad = myimg.createLinearGradient(rectX,rectY,usercount[i],rectH);
    grad.addColorStop(0.05, "#7DBBD4");
    grad.addColorStop(0.1 , "#44C15F");
    grad.addColorStop(0.3 , "#69822B");
    grad.addColorStop(0.7 , "#17452D"); 
    myimg.fillStyle = grad;
 
	myimg.fillRect(rectX, rectY, (usercount[i])*5, rectH); /*I multiple the numbers by 5 to make them bigger
    myimg.lineWidth = 1;
    myimg.strokeRect(rectX,rectY,(usercount[i])*5, rectH);
	fontY = fontY + 33;  /*move the next text block down 33 pixels
	}

}

*/







