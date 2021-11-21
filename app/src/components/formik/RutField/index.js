import { Input, applyTheme } from "bumbag";
import { useField } from "formik";
import { format } from "rut.js";

const MUInput = applyTheme(Input, {
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

const RutField = ({
    name,
    ...restProps
}) => {
    //eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const { value } = meta;
    const { setValue } = helpers;
    return (
        <MUInput
            {...restProps}
            containLabel={true}
            value={value}
            onChange={e => setValue(format(e.target.value))}
        />
    );
};

export { RutField };