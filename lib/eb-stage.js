"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkEBStage = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cdk_appln_stack_1 = require("./cdk-appln-stack");
/**
 * Deployable unit of web service app
 */
class CdkEBStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        const service = new cdk_appln_stack_1.EBApplnStack(this, "WebService", {
            minSize: props?.minSize,
            maxSize: props?.maxSize,
            instanceTypes: props?.instanceTypes,
            envName: props?.envName,
        });
    }
}
exports.CdkEBStage = CdkEBStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWItc3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlYi1zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBb0M7QUFFcEMsdURBQTZEO0FBRTdEOztHQUVHO0FBQ0gsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87WUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPO1lBQ3ZCLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYTtZQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBWEQsZ0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFnZSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xyXG5pbXBvcnQgeyBFQkVudlByb3BzLCBFQkFwcGxuU3RhY2sgfSBmcm9tIFwiLi9jZGstYXBwbG4tc3RhY2tcIjtcclxuXHJcbi8qKlxyXG4gKiBEZXBsb3lhYmxlIHVuaXQgb2Ygd2ViIHNlcnZpY2UgYXBwXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2RrRUJTdGFnZSBleHRlbmRzIFN0YWdlIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IEVCRW52UHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgRUJBcHBsblN0YWNrKHRoaXMsIFwiV2ViU2VydmljZVwiLCB7XHJcbiAgICAgIG1pblNpemU6IHByb3BzPy5taW5TaXplLFxyXG4gICAgICBtYXhTaXplOiBwcm9wcz8ubWF4U2l6ZSxcclxuICAgICAgaW5zdGFuY2VUeXBlczogcHJvcHM/Lmluc3RhbmNlVHlwZXMsXHJcbiAgICAgIGVudk5hbWU6IHByb3BzPy5lbnZOYW1lLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==