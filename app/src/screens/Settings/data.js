import * as Yup from 'yup';

const configFormInitialValues = (user) => {
    return ({
        rut: '',
        passwordEboleta: '',
        certificate: '',
        ...(user || {})
    });
};

const keyFormIntialValues = (user) => {
    return ({
        key: user?.key ?? ''
    });
};

const configFormValidation = Yup.object().shape({
    rut: Yup.string().required("Campo obligatorio"),
    passwordEboleta: Yup.string().required("Campo obligatorio"),
    certificate: Yup.string().required("Campo obligatorio"),
});

const keyFormValidation = Yup.object().shape({
    key: Yup.string().required("Campo obligatorio"),
});

export { configFormInitialValues, keyFormIntialValues, configFormValidation, keyFormValidation };