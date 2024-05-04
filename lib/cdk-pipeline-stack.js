"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkPipelineStack = void 0;
const pipelines_1 = require("aws-cdk-lib/pipelines");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const eb_stage_1 = require("./eb-stage");
/**
 * The stack that defines the application pipeline
 */
class CdkPipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new pipelines_1.CodePipeline(this, "Pipeline", {
            // The pipeline name
            pipelineName: "MyServicePipeline",
            // How it will be built and synthesized
            synth: new pipelines_1.ShellStep("Synth", {
                // Where the source can be found
                input: pipelines_1.CodePipelineSource.gitHub("ol-dychka/cdk-pipeline-eb-demo", "main"),
                // Install dependencies, build and run cdk synth
                installCommands: ["npm i -g npm@latest"],
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
        // This is where we add the application stages
        // deploy beanstalk app
        // For environment with all default values:
        // const deploy = new CdkEBStage(this, 'Pre-Prod');
        // For environment with custom AutoScaling group configuration
        const deploy = new eb_stage_1.CdkEBStage(this, "Pre-Prod", {
            minSize: "1",
            maxSize: "2",
        });
        const deployStage = pipeline.addStage(deploy);
    }
}
exports.CdkPipelineStack = CdkPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXBpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUkrQjtBQUUvQiw2Q0FBZ0Q7QUFDaEQseUNBQXdDO0FBRXhDOztHQUVHO0FBQ0gsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2xELG9CQUFvQjtZQUNwQixZQUFZLEVBQUUsbUJBQW1CO1lBRWpDLHVDQUF1QztZQUN2QyxLQUFLLEVBQUUsSUFBSSxxQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsZ0NBQWdDO2dCQUNoQyxLQUFLLEVBQUUsOEJBQWtCLENBQUMsTUFBTSxDQUM5QixnQ0FBZ0MsRUFDaEMsTUFBTSxDQUNQO2dCQUVELGdEQUFnRDtnQkFDaEQsZUFBZSxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3hDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO2FBQ3ZELENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSCw4Q0FBOEM7UUFFOUMsdUJBQXVCO1FBQ3ZCLDJDQUEyQztRQUMzQyxtREFBbUQ7UUFFbkQsOERBQThEO1FBQzlELE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzlDLE9BQU8sRUFBRSxHQUFHO1lBQ1osT0FBTyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRjtBQW5DRCw0Q0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvZGVQaXBlbGluZSxcclxuICBDb2RlUGlwZWxpbmVTb3VyY2UsXHJcbiAgU2hlbGxTdGVwLFxyXG59IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgQ2RrRUJTdGFnZSB9IGZyb20gXCIuL2ViLXN0YWdlXCI7XHJcblxyXG4vKipcclxuICogVGhlIHN0YWNrIHRoYXQgZGVmaW5lcyB0aGUgYXBwbGljYXRpb24gcGlwZWxpbmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDZGtQaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVcIiwge1xyXG4gICAgICAvLyBUaGUgcGlwZWxpbmUgbmFtZVxyXG4gICAgICBwaXBlbGluZU5hbWU6IFwiTXlTZXJ2aWNlUGlwZWxpbmVcIixcclxuXHJcbiAgICAgIC8vIEhvdyBpdCB3aWxsIGJlIGJ1aWx0IGFuZCBzeW50aGVzaXplZFxyXG4gICAgICBzeW50aDogbmV3IFNoZWxsU3RlcChcIlN5bnRoXCIsIHtcclxuICAgICAgICAvLyBXaGVyZSB0aGUgc291cmNlIGNhbiBiZSBmb3VuZFxyXG4gICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuZ2l0SHViKFxyXG4gICAgICAgICAgXCJvbC1keWNoa2EvY2RrLXBpcGVsaW5lLWViLWRlbW9cIixcclxuICAgICAgICAgIFwibWFpblwiXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgLy8gSW5zdGFsbCBkZXBlbmRlbmNpZXMsIGJ1aWxkIGFuZCBydW4gY2RrIHN5bnRoXHJcbiAgICAgICAgaW5zdGFsbENvbW1hbmRzOiBbXCJucG0gaSAtZyBucG1AbGF0ZXN0XCJdLFxyXG4gICAgICAgIGNvbW1hbmRzOiBbXCJucG0gY2lcIiwgXCJucG0gcnVuIGJ1aWxkXCIsIFwibnB4IGNkayBzeW50aFwiXSxcclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUaGlzIGlzIHdoZXJlIHdlIGFkZCB0aGUgYXBwbGljYXRpb24gc3RhZ2VzXHJcblxyXG4gICAgLy8gZGVwbG95IGJlYW5zdGFsayBhcHBcclxuICAgIC8vIEZvciBlbnZpcm9ubWVudCB3aXRoIGFsbCBkZWZhdWx0IHZhbHVlczpcclxuICAgIC8vIGNvbnN0IGRlcGxveSA9IG5ldyBDZGtFQlN0YWdlKHRoaXMsICdQcmUtUHJvZCcpO1xyXG5cclxuICAgIC8vIEZvciBlbnZpcm9ubWVudCB3aXRoIGN1c3RvbSBBdXRvU2NhbGluZyBncm91cCBjb25maWd1cmF0aW9uXHJcbiAgICBjb25zdCBkZXBsb3kgPSBuZXcgQ2RrRUJTdGFnZSh0aGlzLCBcIlByZS1Qcm9kXCIsIHtcclxuICAgICAgbWluU2l6ZTogXCIxXCIsXHJcbiAgICAgIG1heFNpemU6IFwiMlwiLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkZXBsb3lTdGFnZSA9IHBpcGVsaW5lLmFkZFN0YWdlKGRlcGxveSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==