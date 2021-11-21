import { 
    Box, 
    Modal as BBModal, 
    Card, 
    applyTheme, 
    Button,
    Set
} from 'bumbag';
import { useField } from 'formik';
//import { Input as BInput } from 'bumbag';

const Modal = applyTheme(BBModal, {
    styles: {
        base: {
            zIndex: 19900415
        },
    },
    Backdrop: {
        styles: {
            zIndex: 19900412,
            base: {
                zIndex: 19900412
            }
        }
    }
});

const defaultColors = [
    '#033A90',
    '#FFC700',
    '#6DC229',
    '#DB2E2E',
    '#4608AC',
    '#FF7A00'
];

const SwatchField = ({
    name,
    ...restProps
}) => {
    //eslint-disable-next-line
    const [ field, meta, helpers ] = useField(name);
    const modal = Modal.useState();
    const handleColorClick = (color) => {
        helpers.setValue(color);
        modal.hide();
    };

    return (
        <Box position = "relative" borderRadius = "6px" overflow = "hidden">
            <Box
                height = "3.25rem"
                width = "3.25rem"
                background = {meta.value ? meta.value : defaultColors[0] }
                position = "absolute"
                left = {0}
                top = {0}
                onClick = {() => {
                    modal.show();
                }}
            />
            <Box 
                borderRadius = "6px"
                use = "input" 
                background = "#022864"
                borderColor = "#0A3679"
                color = "#ffffff"
                height = "3.25rem"
                width = "100%"
                onFocus = {(event) => {
                    event.preventDefault();
                    modal.show();
                }}
                paddingLeft = "4rem"
                {...restProps}
            />
            <Modal {...modal} slide style = {{
                minWidth: 260
            }}>
                <Card title = "Seleccione color" headerAddon = {
                    <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                } >
                    <Set spacing = "major-2">
                        {defaultColors.map( color => (
                            <Box
                                borderRadius = "6px"
                                width = "48px"
                                height = "48px"
                                key = {color}
                                background = {color}
                                onClick = {() => {
                                    handleColorClick(color);
                                }}
                            />
                        ))}
                    </Set>
                </Card>
            </Modal>
        </Box>
    );
};

export { SwatchField };