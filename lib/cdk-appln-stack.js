"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBApplnStack = void 0;
const cdk = require("aws-cdk-lib");
const s3assets = require("aws-cdk-lib/aws-s3-assets");
const elasticbeanstalk = require("aws-cdk-lib/aws-elasticbeanstalk");
const iam = require("aws-cdk-lib/aws-iam");
class EBApplnStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Construct an S3 asset Zip from directory up.
        const webAppZipArchive = new s3assets.Asset(this, "WebAppZip", {
            path: `${__dirname}/../src`,
        });
        // Create a ElasticBeanStalk app.
        const appName = "MyWebApp";
        const app = new elasticbeanstalk.CfnApplication(this, "Application", {
            applicationName: appName,
        });
        // Create an app version from the S3 asset defined earlier
        const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(this, "AppVersion", {
            applicationName: appName,
            sourceBundle: {
                s3Bucket: webAppZipArchive.s3BucketName,
                s3Key: webAppZipArchive.s3ObjectKey,
            },
        });
        // Make sure that Elastic Beanstalk app exists before creating an app version
        appVersionProps.addDependency(app);
        // Create role and instance profile
        const myRole = new iam.Role(this, `${appName}-aws-elasticbeanstalk-ec2-role`, {
            assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
        });
        const managedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName("AWSElasticBeanstalkWebTier");
        myRole.addManagedPolicy(managedPolicy);
        const myProfileName = `${appName}-InstanceProfile`;
        const instanceProfile = new iam.CfnInstanceProfile(this, myProfileName, {
            instanceProfileName: myProfileName,
            roles: [myRole.roleName],
        });
        // Example of some options which can be configured
        const optionSettingProperties = [
            {
                namespace: "aws:autoscaling:launchconfiguration",
                optionName: "IamInstanceProfile",
                value: myProfileName,
            },
            {
                namespace: "aws:autoscaling:asg",
                optionName: "MinSize",
                value: props?.maxSize ?? "1",
            },
            {
                namespace: "aws:autoscaling:asg",
                optionName: "MaxSize",
                value: props?.maxSize ?? "1",
            },
            {
                namespace: "aws:ec2:instances",
                optionName: "InstanceTypes",
                value: props?.instanceTypes ?? "t2.micro",
            },
        ];
        // Create an Elastic Beanstalk environment to run the application
        const elbEnv = new elasticbeanstalk.CfnEnvironment(this, "Environment", {
            environmentName: props?.envName ?? "MyWebAppEnvironment",
            applicationName: app.applicationName || appName,
            solutionStackName: "64bit Amazon Linux 2023 v6.1.4 running Node.js 20",
            optionSettings: optionSettingProperties,
            versionLabel: appVersionProps.ref,
        });
    }
}
exports.EBApplnStack = EBApplnStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWFwcGxuLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLWFwcGxuLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyxzREFBc0Q7QUFDdEQscUVBQXFFO0FBQ3JFLDJDQUEyQztBQVUzQyxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3QywrQ0FBK0M7UUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUM3RCxJQUFJLEVBQUUsR0FBRyxTQUFTLFNBQVM7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsaUNBQWlDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLEdBQUcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ25FLGVBQWUsRUFBRSxPQUFPO1NBQ3pCLENBQUMsQ0FBQztRQUVILDBEQUEwRDtRQUMxRCxNQUFNLGVBQWUsR0FBRyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixDQUNoRSxJQUFJLEVBQ0osWUFBWSxFQUNaO1lBQ0UsZUFBZSxFQUFFLE9BQU87WUFDeEIsWUFBWSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxZQUFZO2dCQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsV0FBVzthQUNwQztTQUNGLENBQ0YsQ0FBQztRQUVGLDZFQUE2RTtRQUM3RSxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLG1DQUFtQztRQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQ3pCLElBQUksRUFDSixHQUFHLE9BQU8sZ0NBQWdDLEVBQzFDO1lBQ0UsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO1NBQ3pELENBQ0YsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQzlELDRCQUE0QixDQUM3QixDQUFDO1FBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sYUFBYSxHQUFHLEdBQUcsT0FBTyxrQkFBa0IsQ0FBQztRQUVuRCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3RFLG1CQUFtQixFQUFFLGFBQWE7WUFDbEMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUN6QixDQUFDLENBQUM7UUFFSCxrREFBa0Q7UUFDbEQsTUFBTSx1QkFBdUIsR0FDM0I7WUFDRTtnQkFDRSxTQUFTLEVBQUUscUNBQXFDO2dCQUNoRCxVQUFVLEVBQUUsb0JBQW9CO2dCQUNoQyxLQUFLLEVBQUUsYUFBYTthQUNyQjtZQUNEO2dCQUNFLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sSUFBSSxHQUFHO2FBQzdCO1lBQ0Q7Z0JBQ0UsU0FBUyxFQUFFLHFCQUFxQjtnQkFDaEMsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLEdBQUc7YUFDN0I7WUFDRDtnQkFDRSxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixVQUFVLEVBQUUsZUFBZTtnQkFDM0IsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLElBQUksVUFBVTthQUMxQztTQUNGLENBQUM7UUFFSixpRUFBaUU7UUFDakUsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RSxlQUFlLEVBQUUsS0FBSyxFQUFFLE9BQU8sSUFBSSxxQkFBcUI7WUFDeEQsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlLElBQUksT0FBTztZQUMvQyxpQkFBaUIsRUFBRSxtREFBbUQ7WUFDdEUsY0FBYyxFQUFFLHVCQUF1QjtZQUN2QyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUc7U0FDbEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBeEZELG9DQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgKiBhcyBzM2Fzc2V0cyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzLWFzc2V0c1wiO1xuaW1wb3J0ICogYXMgZWxhc3RpY2JlYW5zdGFsayBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNiZWFuc3RhbGtcIjtcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVCRW52UHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gIC8vIEF1dG9zY2FsaW5nIGdyb3VwIGNvbmZpZ3VyYXRpb25cbiAgbWluU2l6ZT86IHN0cmluZztcbiAgbWF4U2l6ZT86IHN0cmluZztcbiAgaW5zdGFuY2VUeXBlcz86IHN0cmluZztcbiAgZW52TmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVCQXBwbG5TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogRUJFbnZQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBDb25zdHJ1Y3QgYW4gUzMgYXNzZXQgWmlwIGZyb20gZGlyZWN0b3J5IHVwLlxuICAgIGNvbnN0IHdlYkFwcFppcEFyY2hpdmUgPSBuZXcgczNhc3NldHMuQXNzZXQodGhpcywgXCJXZWJBcHBaaXBcIiwge1xuICAgICAgcGF0aDogYCR7X19kaXJuYW1lfS8uLi9zcmNgLFxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgRWxhc3RpY0JlYW5TdGFsayBhcHAuXG4gICAgY29uc3QgYXBwTmFtZSA9IFwiTXlXZWJBcHBcIjtcbiAgICBjb25zdCBhcHAgPSBuZXcgZWxhc3RpY2JlYW5zdGFsay5DZm5BcHBsaWNhdGlvbih0aGlzLCBcIkFwcGxpY2F0aW9uXCIsIHtcbiAgICAgIGFwcGxpY2F0aW9uTmFtZTogYXBwTmFtZSxcbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBhbiBhcHAgdmVyc2lvbiBmcm9tIHRoZSBTMyBhc3NldCBkZWZpbmVkIGVhcmxpZXJcbiAgICBjb25zdCBhcHBWZXJzaW9uUHJvcHMgPSBuZXcgZWxhc3RpY2JlYW5zdGFsay5DZm5BcHBsaWNhdGlvblZlcnNpb24oXG4gICAgICB0aGlzLFxuICAgICAgXCJBcHBWZXJzaW9uXCIsXG4gICAgICB7XG4gICAgICAgIGFwcGxpY2F0aW9uTmFtZTogYXBwTmFtZSxcbiAgICAgICAgc291cmNlQnVuZGxlOiB7XG4gICAgICAgICAgczNCdWNrZXQ6IHdlYkFwcFppcEFyY2hpdmUuczNCdWNrZXROYW1lLFxuICAgICAgICAgIHMzS2V5OiB3ZWJBcHBaaXBBcmNoaXZlLnMzT2JqZWN0S2V5LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBFbGFzdGljIEJlYW5zdGFsayBhcHAgZXhpc3RzIGJlZm9yZSBjcmVhdGluZyBhbiBhcHAgdmVyc2lvblxuICAgIGFwcFZlcnNpb25Qcm9wcy5hZGREZXBlbmRlbmN5KGFwcCk7XG5cbiAgICAvLyBDcmVhdGUgcm9sZSBhbmQgaW5zdGFuY2UgcHJvZmlsZVxuICAgIGNvbnN0IG15Um9sZSA9IG5ldyBpYW0uUm9sZShcbiAgICAgIHRoaXMsXG4gICAgICBgJHthcHBOYW1lfS1hd3MtZWxhc3RpY2JlYW5zdGFsay1lYzItcm9sZWAsXG4gICAgICB7XG4gICAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKFwiZWMyLmFtYXpvbmF3cy5jb21cIiksXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IG1hbmFnZWRQb2xpY3kgPSBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICBcIkFXU0VsYXN0aWNCZWFuc3RhbGtXZWJUaWVyXCJcbiAgICApO1xuICAgIG15Um9sZS5hZGRNYW5hZ2VkUG9saWN5KG1hbmFnZWRQb2xpY3kpO1xuXG4gICAgY29uc3QgbXlQcm9maWxlTmFtZSA9IGAke2FwcE5hbWV9LUluc3RhbmNlUHJvZmlsZWA7XG5cbiAgICBjb25zdCBpbnN0YW5jZVByb2ZpbGUgPSBuZXcgaWFtLkNmbkluc3RhbmNlUHJvZmlsZSh0aGlzLCBteVByb2ZpbGVOYW1lLCB7XG4gICAgICBpbnN0YW5jZVByb2ZpbGVOYW1lOiBteVByb2ZpbGVOYW1lLFxuICAgICAgcm9sZXM6IFtteVJvbGUucm9sZU5hbWVdLFxuICAgIH0pO1xuXG4gICAgLy8gRXhhbXBsZSBvZiBzb21lIG9wdGlvbnMgd2hpY2ggY2FuIGJlIGNvbmZpZ3VyZWRcbiAgICBjb25zdCBvcHRpb25TZXR0aW5nUHJvcGVydGllczogZWxhc3RpY2JlYW5zdGFsay5DZm5FbnZpcm9ubWVudC5PcHRpb25TZXR0aW5nUHJvcGVydHlbXSA9XG4gICAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lc3BhY2U6IFwiYXdzOmF1dG9zY2FsaW5nOmxhdW5jaGNvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICBvcHRpb25OYW1lOiBcIklhbUluc3RhbmNlUHJvZmlsZVwiLFxuICAgICAgICAgIHZhbHVlOiBteVByb2ZpbGVOYW1lLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZXNwYWNlOiBcImF3czphdXRvc2NhbGluZzphc2dcIixcbiAgICAgICAgICBvcHRpb25OYW1lOiBcIk1pblNpemVcIixcbiAgICAgICAgICB2YWx1ZTogcHJvcHM/Lm1heFNpemUgPz8gXCIxXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lc3BhY2U6IFwiYXdzOmF1dG9zY2FsaW5nOmFzZ1wiLFxuICAgICAgICAgIG9wdGlvbk5hbWU6IFwiTWF4U2l6ZVwiLFxuICAgICAgICAgIHZhbHVlOiBwcm9wcz8ubWF4U2l6ZSA/PyBcIjFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWVzcGFjZTogXCJhd3M6ZWMyOmluc3RhbmNlc1wiLFxuICAgICAgICAgIG9wdGlvbk5hbWU6IFwiSW5zdGFuY2VUeXBlc1wiLFxuICAgICAgICAgIHZhbHVlOiBwcm9wcz8uaW5zdGFuY2VUeXBlcyA/PyBcInQyLm1pY3JvXCIsXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgLy8gQ3JlYXRlIGFuIEVsYXN0aWMgQmVhbnN0YWxrIGVudmlyb25tZW50IHRvIHJ1biB0aGUgYXBwbGljYXRpb25cbiAgICBjb25zdCBlbGJFbnYgPSBuZXcgZWxhc3RpY2JlYW5zdGFsay5DZm5FbnZpcm9ubWVudCh0aGlzLCBcIkVudmlyb25tZW50XCIsIHtcbiAgICAgIGVudmlyb25tZW50TmFtZTogcHJvcHM/LmVudk5hbWUgPz8gXCJNeVdlYkFwcEVudmlyb25tZW50XCIsXG4gICAgICBhcHBsaWNhdGlvbk5hbWU6IGFwcC5hcHBsaWNhdGlvbk5hbWUgfHwgYXBwTmFtZSxcbiAgICAgIHNvbHV0aW9uU3RhY2tOYW1lOiBcIjY0Yml0IEFtYXpvbiBMaW51eCAyMDIzIHY2LjEuNCBydW5uaW5nIE5vZGUuanMgMjBcIixcbiAgICAgIG9wdGlvblNldHRpbmdzOiBvcHRpb25TZXR0aW5nUHJvcGVydGllcyxcbiAgICAgIHZlcnNpb25MYWJlbDogYXBwVmVyc2lvblByb3BzLnJlZixcbiAgICB9KTtcbiAgfVxufVxuIl19