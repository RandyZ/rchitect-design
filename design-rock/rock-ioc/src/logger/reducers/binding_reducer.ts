import * as inversify from "inversify";
import interfaces from "../interfaces/interfaces";

function bindingReducer(
    binding: inversify.interfaces.Binding<any>,
    options: interfaces.BindingLoggerSettings
) {

    const props = [
        "type", "serviceIdentifier", "implementationType",
        "activated", "cache", "constraint", "dynamicValue",
        "factory", "onActivation", "provider", "scope"
    ];

    const reducedBinding: any = {};
    const bindingOptions: any = options;
    const oldBinding: any = binding;

    props.forEach((prop) => {
        if (bindingOptions[prop]) {
            reducedBinding[prop] = oldBinding[prop];
        }
    });

    return reducedBinding;
}

export default bindingReducer;
