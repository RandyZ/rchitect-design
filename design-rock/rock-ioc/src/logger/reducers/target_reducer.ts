import * as inversify from "inversify";
import interfaces from "../interfaces/interfaces";

function targetReducer(
    target: inversify.interfaces.Target,
    options: interfaces.TargetLoggerSettings
) {


    const reducedTarget: any = {};
    const targetOptions: any = options;
    const oldTarget: any = target;

    if (targetOptions.name) {
        reducedTarget.name = oldTarget.name;
    }

    if (targetOptions.serviceIdentifier) {
        reducedTarget.serviceIdentifier = oldTarget.serviceIdentifier;
    }

    if (targetOptions.metadata && Array.isArray(target.metadata)) {
        const reducedMetadata = target.metadata.map((m: inversify.interfaces.Metadata, i: number) => {
            return {
                key: m.key,
                value: m.value
            };
        });
        reducedTarget.metadata = reducedMetadata;
    }

    return reducedTarget;
}

export default targetReducer;
