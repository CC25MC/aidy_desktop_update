import {
    Box,
    Modal as BBModal,
    Card,
    applyTheme,
    Button,
    Set,
    Text
} from 'bumbag';
import { useField } from 'formik';
import { useState } from 'react';
import { TextField } from '../../atoms/TextField';
//import { Input as BInput } from 'bumbag';
import Ve from "assets/ve.png";
import Cl from "assets/cl.png";
import Co from "assets/co.png";
import Ar from "assets/ar.png";

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

const defaultcountry = [
    {
        country: "Ch",
        code: "+56",
        flag: Cl,
    },
    {
        country: "Co",
        code: "+57",
        flag: Co,
    },
    {
        country: "Ve",
        code: "+58",
        flag: Ve,
    },
    {
        country: "Ar",
        code: "+54",
        flag: Ar,
    },
];

const PhoneInput = ({
    name,
    label,
    defaultValue = "",
    onChange,
    value,
    ...restProps
}) => {
    //eslint-disable-next-line
    const modal = Modal.useState();
    const phoneCode = defaultValue.substr(0,3);
    const [country, setCountry] = useState( 
        defaultcountry.find( country => country.code === phoneCode ) || null 
    );
    const handleCountryClick = (country) => {
        setCountry(country);
        if( typeof onChange === "function" ){
            onChange(country.code)
        }
        modal.hide();
    };
    const handlePhone = (event) => {
        if( typeof onChange === 'function' ){
            onChange(event.target.value);
        }
    };

    return (
        <Box position="relative" borderRadius="6px" overflow="hidden">
            <Box
                zIndex = "10"
                height="3.25rem"
                width="4rem"
                position="absolute"
                left={0}
                top={0}
                cursor="pointer"
                style={{
                    backgroundRepeat: 'no-repeat', backgroundPosition: "center",
                    backgroundImage: `url('${country?.flag}')`,
                }}
                onClick={() => {
                    modal.show();
                }}
            />
            <Box
                borderRadius="6px"
                use={TextField}
                label = {label}
                background="#022864"
                borderColor="#0A3679"
                color="white"
                height="3.25rem"
                width="100%"
                value={value}
                onChange={(event) => handlePhone(event)}
                onFocus={(event) => {
                    if (!country) {
                        event.preventDefault();
                        modal.show();
                    }
                }}
                paddingLeft="5rem"
                {...restProps}
            />
            <Modal {...modal} slide style={{
                minWidth: 300
            }}>
                <Card title="Seleccione País" headerAddon={
                    <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                } >
                    <Set spacing="major-2">
                        {defaultcountry.map(item => (
                            <Box key={item?.code}>
                                <Box
                                    borderRadius="6px"
                                    width="80px"
                                    height="53px"
                                    style={{
                                        backgroundRepeat: 'no-repeat', backgroundPosition: "center",
                                        backgroundImage: `url('${item?.flag}')`,
                                    }}
                                    onClick={() => {
                                        handleCountryClick(item);
                                    }}
                                />
                                <Text alignX="center" alignY="center">
                                    {item?.country}
                                </Text>
                            </Box>
                        ))}
                    </Set>
                </Card>
            </Modal>
        </Box>
    );
};

export { PhoneInput };