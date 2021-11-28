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
    username:'client0',
    password:'client0passwd'
}

let inc = 0;

const client = mqtt.connect(options)

client.on('connect', () => {
    client.subscribe('sub/ack');
    console.log("\r\nclient0 connected to broker \r\n ");
})

client.on('message', (topic, message) => {
    if (topic=='sub/ack') {
        console.log( '\n' + message.toString());
        if(inc >= 100){
            client.publish('pub/data', 'done');
            return 0;
        }
        inc++;
        message = inc.toString();
        console.log( '\n' + message.toString());
        client.publish('pub/data', message)
    }
})