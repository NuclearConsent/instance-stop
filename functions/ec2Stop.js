const aws = require('aws-sdk');
var ec2 = new aws.EC2();
let instances = [];

exports.handler = (context) => {
    // List all instances
    ec2.describeInstances(function (err, data) {
        if (err) console.log(err, err.stack);
        // Loop through instances
        for (let a = 0; a < data.Reservations.length; a++) {
            // Loop through tags per instance
            for (let b = 0; b < data.Reservations[a].Instances[0].Tags.length; b++) {
                if (data.Reservations[a].Instances[0].Tags[b].Key == process.env.EC2_KEY && data.Reservations[a].Instances[0].Tags[b].Value == process.env.EC2_VALUE) {
                    // Skip if instance has correct tag
                    a++;
                    break;
                }
            }
            // Push instances to stop into array
            instances.push(data.Reservations[a].Instances[0].InstanceId);
        }
        // Stop array of instances
        ec2.stopInstances({
            InstanceIds: instances
        }, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
        });
    });
};