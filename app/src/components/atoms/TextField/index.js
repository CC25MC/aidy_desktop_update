import { Input, applyTheme } from 'bumbag';

const MUInput = applyTheme(Input, {
    styles: {
        base: {
            background: "#022864",
            borderColor: "#0A3679",
            color: "#ffffff",
        },
    },
});

export const TextField = ({ placeholder = "ingrese", icon = null, ...props }) => {
    return (
        icon ?
            <MUInput
                before={<Input.Icon icon={icon} />}
                placeholder={placeholder}
                containLabel = {true}
                {...props}
            />
            :
            <MUInput
                placeholder={placeholder}
                containLabel = {true}
                {...props}
            />
    );
};