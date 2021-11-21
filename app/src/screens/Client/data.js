import * as Yup from 'yup';

const formInitialValues = (client) => {
    return ({
        name: '',
        lastname: '',
        phone: '+56',
        rut: '',
        whatsapp: '+56',
        address: '',
        ...(client || {})
    });
};
const formValidation = Yup.object().shape({
    name: Yup.string().required("Campo obligatorio"),
    lastname: Yup.string().required("Campo obligatorio"),
    phone: Yup.string().required("Campo obligatorio"),
    rut: Yup.string().required("Campo obligatorio")
});

export { formInitialValues, formValidation };