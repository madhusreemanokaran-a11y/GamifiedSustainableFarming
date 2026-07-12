// ================= REGISTER =================

function registerFarmer() {

    let farmer = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    };


    fetch("/api/farmer/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(farmer)

    })


        .then(async response => {

            let data = await response.text();

            if (!response.ok) {

                throw new Error(data);

            }

            return JSON.parse(data);

        })


        .then(data => {

            alert("Registration Successful!");

            window.location.href = "login.html";

        })


        .catch(error => {

            alert(error.message);

        });

}



// ================= LOGIN =================

function loginFarmer() {


    let farmer = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };



    fetch("/api/farmer/login", {


        method: "POST",


        headers: {

            "Content-Type": "application/json"

        },


        body: JSON.stringify(farmer)


    })


        .then(async response => {


            let data = await response.text();


            if (!response.ok) {


                throw new Error(data);


            }


            return JSON.parse(data);


        })


        .then(data => {


            let email = data.email;



            localStorage.setItem("loggedIn", "true");

            localStorage.setItem("name", data.name);

            localStorage.setItem("email", email);



            // Create separate data for each farmer

            if(localStorage.getItem(email+"_points") == null){

                localStorage.setItem(email+"_points","0");

                localStorage.setItem(email+"_challengeCount","0");

            }



            alert("Login Successful!");


            window.location.href="dashboard.html";


        })


        .catch(error=>{


            alert(error.message);


        });


}




// ================= LOGOUT =================


function logout(){


    localStorage.removeItem("loggedIn");

    localStorage.removeItem("name");

    localStorage.removeItem("email");


    alert("Logged Out Successfully");


    window.location.href="login.html";


}




// ================= LOGIN CHECK =================


function checkLogin(){


    return localStorage.getItem("loggedIn")==="true";


}
// ================= GET CURRENT FARMER DATA =================

function getFarmerEmail(){

    return localStorage.getItem("email");

}



// ================= MESSAGE =================

function showMessage(){

    let box = document.getElementById("messageBox");


    if(box){

        box.style.display="block";


        setTimeout(function(){

            box.style.display="none";

        },2000);

    }

}



// ================= DASHBOARD =================

function startDashboard(){


    let dashboard = document.getElementById("dashboardContent");


    if(!checkLogin()){


        if(dashboard){

            dashboard.style.display="none";

        }


        showMessage();

        return;


    }



    if(dashboard){

        dashboard.style.display="block";

    }



    loadFarmerName();

    showPoints();

    updateProgress();

    updateBadge();


}



// ================= LOAD FARMER DETAILS =================


function loadFarmerName(){


    let name = localStorage.getItem("name") || "Farmer";

    let email = localStorage.getItem("email") || "Not Available";



    if(document.getElementById("farmerName")){


        document.getElementById("farmerName").innerHTML=name;


    }



    if(document.getElementById("farmerEmail")){


        document.getElementById("farmerEmail").innerHTML=email;


    }


}



// ================= SHOW POINTS =================


function showPoints(){


    let email=getFarmerEmail();


    let points=Number(localStorage.getItem(email+"_points")) || 0;


    let count=Number(localStorage.getItem(email+"_challengeCount")) || 0;



    if(document.getElementById("points")){


        document.getElementById("points").innerHTML=points;


    }



    if(document.getElementById("challengeCount")){


        document.getElementById("challengeCount").innerHTML=count;


    }


}



// ================= UPDATE PROGRESS =================


function updateProgress(){


    let email=getFarmerEmail();


    let count=Number(localStorage.getItem(email+"_challengeCount")) || 0;



    let progress=count*20;



    if(progress>100){

        progress=100;

    }



    if(document.getElementById("progress")){


        document.getElementById("progress").innerHTML=
            progress+"%";


    }


}



// ================= UPDATE BADGE =================


function updateBadge(){


    let email=getFarmerEmail();


    let count=Number(localStorage.getItem(email+"_challengeCount")) || 0;



    let badge="🥉 Bronze Farmer";



    if(count>=2){

        badge="🥈 Silver Farmer";

    }


    if(count>=4){

        badge="🥇 Gold Farmer";

    }


    if(count>=5){

        badge="🌟 Eco Champion";

    }



    if(document.getElementById("badge")){


        document.getElementById("badge").innerHTML=badge;


    }


}
// ================= CHALLENGES PAGE =================

function startChallenges(){

    if(!checkLogin()){

        showMessage();

        return;

    }

    showPoints();

}



// ================= COMPLETE CHALLENGE =================

function completeChallenge(rewardPoints){


    let email=getFarmerEmail();



    let points=Number(localStorage.getItem(email+"_points")) || 0;


    let count=Number(localStorage.getItem(email+"_challengeCount")) || 0;



    // Increase farmer's own data

    points += rewardPoints;

    count++;



    localStorage.setItem(email+"_points",points);


    localStorage.setItem(email+"_challengeCount",count);



    alert("Challenge Completed!\nYou earned "+rewardPoints+" points.");



    showPoints();

    updateProgress();

    updateBadge();

    showRewards();


}



// ================= REWARDS PAGE =================


function startRewards(){


    if(!checkLogin()){


        showMessage();

        return;


    }


    showRewards();


}





function showRewards(){


    let email=getFarmerEmail();


    let points=Number(localStorage.getItem(email+"_points")) || 0;



    if(document.getElementById("rewardPoints")){


        document.getElementById("rewardPoints").innerHTML=points;


    }




    if(document.getElementById("bronze")){


        document.getElementById("bronze").innerHTML=

            (points>=100) ? "✅ Unlocked" : "🔒 Locked";


    }




    if(document.getElementById("silver")){


        document.getElementById("silver").innerHTML=

            (points>=250) ? "✅ Unlocked" : "🔒 Locked";


    }




    if(document.getElementById("gold")){


        document.getElementById("gold").innerHTML=

            (points>=500) ? "✅ Unlocked" : "🔒 Locked";


    }





    if(document.getElementById("eco")){


        document.getElementById("eco").innerHTML=

            (points>=1000) ? "✅ Unlocked" : "🔒 Locked";


    }


}





// ================= PAGE NAVIGATION =================


function goPage(page){


    if(checkLogin()){


        window.location.href=page;


    }

    else{


        showMessage();


    }


}




function openDashboard(){


    if(checkLogin()){


        window.location.href="dashboard.html";


    }

    else{


        showMessage();


    }


}





function openChallenges(){


    if(checkLogin()){


        window.location.href="challenges.html";


    }

    else{


        showMessage();


    }


}




function openRewards(){


    if(checkLogin()){


        window.location.href="rewards.html";


    }

    else{


        showMessage();


    }


}
// ================= RESET CURRENT FARMER PROGRESS =================

function resetGame(){


    let email=getFarmerEmail();



    if(email){


        localStorage.removeItem(email+"_points");

        localStorage.removeItem(email+"_challengeCount");


    }



    alert("Your Progress Reset Successfully");


    location.reload();


}