module.exports.fuelRateCalculator = async function fuelRateCalculator(req, res) {
    try {
        let fuelRate = 0, baseRate = 4, companyProfit = 15;
        let specificStates = ['Florida', 'Texas', 'California']
        let data = req.body
        let id = req.params.id;
        if (data) {
            //user is searched into the database with the id sent alongwith the request from front-end
            // if (user) {
            let user = {    //demo user
                fullname: 'Sam',
                address1: 'America',
                address1: 'United States Of America',
                city: 'Los Angeles',
                zip: '90001',
                state: 'Hawaii'
            }
            let flag = false;
            for (const index in specificStates) {
                if (specificStates[index] === user.state) {
                    flag = true
                }
            }
            fuelRate += baseRate;
            if (flag) {
                fuelRate += 0.02;   //location factor
            } else {
                fuelRate += 0.04;   //location factor
            }
            // if(user is searched into the sell record database if it exists there than) {
            fuelRate += 0.01    //history factor
            // }
            let gallons = data.gallons;
            gallons *= 1;
            if (gallons < 1000) {   //gallons factor
                fuelRate += 0.03;
            } else if (gallons >= 1000 && gallons <= 2000) {
                fuelRate += 0.02
            } else {
                fuelRate += 0.01
            }
            if (companyProfit <= 10) {  //profit factor
                fuelRate += 0.03
            } else if (companyProfit > 10 && companyProfit <= 20) {
                fuelRate += 0.02
            } else {
                fuelRate += 0.01
            }

            // }
            res.status(200).json({ fuel_rate: Math.round(fuelRate * 100) / 100, message: "data has successfully recieved" })
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.viewPurchaseHistory = async function viewPurchaseHistory(req, res) {
    try {
        let id = req.params.id;
        console.log(id)
        let history = [
            {
                quantity: 'record from database',
                date_of_purchase: 'date from database',
            }, {
                quantity: 'record from database',
                date_of_purchase: 'date from database',
            }, {
                quantity: 'record from database',
                date_of_purchase: 'date from database',
            }, {
                quantity: 'record from database',
                date_of_purchase: 'date from database',
            }, {
                quantity: 'record from database',
                date_of_purchase: 'date from database',
            },
        ]
        res.status(200).json({ data: history })
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}