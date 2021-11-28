const mqtt = require('mqtt')

// const options= {
//     port: '1883',
//     host: '127.0.0.1',
//     username:'client1',
//     password:'client1passwd'
// }

const options={
    port:'8883',
    host:'192.168.1.204',
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
            throw new Error('Program Terminated')
        }
        client.publish('sub/ack','Ack: Success..!!');
        console.log("Acknowledgement sent to client0 ==> Ack: Success..!! \r\n")

    }
})
client.publish('sub/ack','Ack: Ready');