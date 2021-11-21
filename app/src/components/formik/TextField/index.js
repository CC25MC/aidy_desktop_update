import { Input, applyTheme } from "bumbag";
import { useField } from "formik";

export const MUInput = applyTheme(Input, {
    styles: {
        base: {
            background: "#022864",
            borderColor: "#0A3679",
            color: "#ffffff"
        },
    },
    Wrapper: {
        styles: {
            base: {
                '& > div': {
                    background: 'purple !important'
                }
            }
        }
    }
});

const TextField = ({
    name,
    ...restProps
}) => {
    //eslint-disable-next-line
    const [ field, meta, helpers ] = useField(name);
    return (
        <MUInput
            {...restProps}
            containLabel = {true}
            {...field}
        />
    );
};

export { TextField };