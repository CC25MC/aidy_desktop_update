import * as Yup from 'yup';

const formInitialValues = (product) => {
    return ({
        name: '',
        price: '',
        cost: '',
        color: '#033A90',
        category: null,
        quantity: '',
        images: [],
        code: '',
        ...(product || {})
    });
};

const formValidation = Yup.object().shape({
    name: Yup.string().required("Campo obligatorio"),
    price: Yup.number().positive("Ingrese un valor positivo").required("Campo obligatorio")
});

export { formInitialValues, formValidation };
