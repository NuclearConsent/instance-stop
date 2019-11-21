const aws = require('aws-sdk');
var rds = new aws.RDS();

exports.handler = (context) => {
    // List all RDS instances
    rds.describeDBInstances(function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        // Loop through instances and send tag to 'listTags'
        for (let a = 0; a < data.DBInstances.length; a++) {
            listTags(data.DBInstances[a].DBInstanceArn, data.DBInstances[a].DBInstanceIdentifier);
        }
    });
};

function listTags(arn, id) {
    // List all tags for an arn
    rds.listTagsForResource({ResourceName: arn}, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            // Loop through all tags
            for (let b = 0; b < data.TagList.length; b++) {
                // If if tags match key/value 
                if (data.TagList[b].Key == process.env.RDS_KEY && data.TagList[b].Value == process.env.RDS_VALUE) {
                    b++;
                    break;
                } else {
                    // Stop instance if missing tags
                    rds.stopDBInstance({DBInstanceIdentifier: id}, function (err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else console.log(data); // successful response
                    });
                }
            }
        }
    });
};