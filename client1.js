const mqtt = require('mqtt')

// Use for loopback if no external broker
// const options= {
//     port: '1883',
//     host: '127.0.0.1'
// }

// External broker
const options={
    port:'8883',
    host:'broker.ip.addr.here',
    username:'client1',
    password:'client1passwd'
}

const client = mqtt.connect(options)

client.on('connect', () => {
    client.subscribe('pub/data');
    console.log("\r\nclient1 connected to broker \r\n ");

})


client.on('message', (topic, message) => {

    if (topic=='pub/data') {
        let msg = message.toString()
        console.log('Data received from client0 on topic: pub/data '+ msg);
        if(msg === 'done'){
            return 0;
        }
        client.publish('sub/ack','Ack: Success..!!');
        console.log("Acknowledgement sent to client0 ==> Ack: Success..!! \r\n")

    }
})
client.publish('sub/ack','Ack: Ready');