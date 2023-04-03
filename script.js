const getRegistrationData = async () => {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const response = await fetch('http://localhost:5000/client/register', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "username": username,
                "password": password
            }
        ),
    });
    let parsedResponse = await response.json()
    if (parsedResponse.success) {
        window.location.href = 'index.html'
    } else {
        alert(parsedResponse.message)
    }
}

const getLoginData = async () => {
    var username = document.getElementById('loginusername').value;
    var password = document.getElementById('loginpassword').value;
    const response = await fetch('http://localhost:5000/client/login', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                "username": username,
                "password": password
            }
        ),
    });
    let parsedResponse = await response.json();
    if (parsedResponse.success) {
        localStorage.setItem('token', parsedResponse.userID)
        window.location.href = 'profile.html'
    } else {
        alert(parsedResponse.message)
    }
}

const getUserInfo = async () => {
    var fullname = document.getElementById('full-name').value;
    var address1 = document.getElementById('address1').value;
    var address2 = document.getElementById('address2').value;
    var city = document.getElementById('city').value;
    var zipcode = document.getElementById('zipcode').value;
    var state = document.getElementById('state').value;
    const response = await fetch('http://localhost:5000/client/personal_information', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        },
        body: JSON.stringify({
            fullname: fullname,
            address1: address1,
            address2: address2,
            city: city,
            zip_code: zipcode,
            state: state
        }),
    });
    let parsedResponse = await response.json();
    if (parsedResponse.success) {
        if (localStorage.setItem('user')) {
            localStorage.removeItem('user')
            let user = JSON.stringify(parsedResponse.user)
            localStorage.setItem('user', user)
        } else {
            let user = JSON.stringify(parsedResponse.user)
            localStorage.setItem('user', user)
        }
        window.location.href = 'fuelquote.html'
    } else {
        alert(parsedResponse.message)
        window.location.href = 'register.html'
    }
}

const previewData = () => {
    let user = localStorage.getItem('user')
    let rate = localStorage.getItem('fuelData')
    if (rate) {
        rate = JSON.parse(rate)
        document.getElementById('suggested-price').value = rate.fuel_rate;
    }
    if (user) {
        user = JSON.parse(user)
        document.getElementById('delivery-address').value = user.address
    } else {
        alert("please register/login first.")
    }
}

const getFuelData = async () => {
    let data = {
        gallons: document.getElementById('gallons-requested').value,
        date: document.getElementById('delivery-date').value
    }
    let response = await fetch('http://localhost:5000/fuel/rate', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    });
    let parsedResponse = await response.json()
    if (parsedResponse.success) {
        if (localStorage.getItem('fuelData')) {
            localStorage.removeItem('fuelData')
            let data = JSON.stringify(parsedResponse)
            localStorage.setItem('fuelData', data)
            console.log(data)
        } else {
            let data = JSON.stringify(parsedResponse)
            localStorage.setItem('fuelData', data)
        }
    } else { alert(parsedResponse.error) }
}

const display_data = async () => {
    let para = '';
    let response = await fetch('http://localhost:5000/fuel/history', {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        },
    });
    let parsedResponse = await response.json()
    if (parsedResponse.success) {
        console.log(parsedResponse.data)
        let data = parsedResponse.data;
        for (let i = 0; i < data.length; i++) {
            if (i === data.length - 1) {
                para += `<p style="padding-left: 15px;" >Gallons : ${data[i].gallons}   Date Of Purchasing : ${data[i].date}</p>`
            } else {
                para += `<p style="border-bottom-width: 1.5px;border-top-width: 0px;border-right-width: 0px;border-left-width: 0px;  border-color: green; border-style: solid ;padding-left: 15px;" >Gallons : ${data[i].gallons}   Date Of Purchasing : ${data[i].date}</p>`
            }

        }
        document.getElementById('display-data').innerHTML = para
    } else {
        para += `<p style="padding-left: 15px;">${parsedResponse.message}</p>`
        document.getElementById('display-data').innerHTML = para
    }
}