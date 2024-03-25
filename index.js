import Express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = Express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(Express.static('public'));

// const API Structure = "https://api.openweathermap.org/data/2.5/weather?q=allahabad&appid=e1f3ac8926d08ec74274bd195e338825&units=metric"
const Api = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = '&appid=e1f3ac8926d08ec74274bd195e338825&units=metric';

function dateAndTimePicker() {
    const date = new Date();
    const arr = [];

    const day = date.getDay();
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = date.getMonth();
    const Monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    // Get the time:

    /* const hour = date.getHours();
     const mint = date.getMinutes();
     const sec = date.getSeconds();
     const time = `${hour}: ${mint} : ${sec}`; */

    arr[0] = dayName[day];
    arr[1] = Monthname[month];


    return arr
}




app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/weather", async (req, res) => {
    const city = req.body.cityname;
    console.log(city)
    try {
        const response = await axios.get(Api + city + apiKey);
        console.log(response)
        res.render("feature.ejs", {
            allData: response.data,
            dateAndTime: dateAndTimePicker(),
            //     liveTime: updateLiveTime()
        });

    } catch (error) {
        console.error("Failed to make request", error.message);
        res.render("feature.ejs", {
            error: ("Oops! " + error.message)
        })

    }

})


app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
