import * as signalR from "@microsoft/signalr";
const URL = process.env.HUB_ADDRESS ?? "https://localhost:5001/hub"; //or whatever your backend port is
const Connector = () => {
       /* let connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .build();


    connection.start()


    connection.on("messageReceived", (username, message) => {
        console.log(username, message);
    });



    */
   <h1>hi</h1>
     
    };
export default Connector;