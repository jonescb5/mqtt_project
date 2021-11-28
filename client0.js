const readline = require('readline')
const mqtt = require('mqtt')

// const options= {
//     port: '1883',
//     host: '127.0.0.1',
//     username:'client0',
//     password:'client0passwd'
// }

const options={
    port:'8883',
    host:'192.168.1.204',
    username:'client0',
    password:'client0passwd'
}

let inc = 0;

const client = mqtt.connect(options)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('connect', () => {
    client.subscribe('sub/ack');
    console.log("\r\nclient0 connected to broker \r\n ");
})

client.on('message', (topic, message) => {
    if (topic=='sub/ack') {
        console.log( '\n' + message.toString());
        if(inc >= 100){
            client.publish('pub/data', 'done');
            throw new Error('Program Terminated');
        }
        inc++;
        message = inc.toString();
        console.log( '\n' + message.toString());
        client.publish('pub/data', message)
    }
})