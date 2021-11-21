import * as Yup from 'yup';

export const Actions = () => {
	const formInitialValues = (user) => {
		return ({
			rut: '',
			passwordEboleta: '',
			certificate: '',
			...(user || {})
		});
	};
	const formkey = (user) => {
		return ({
			key: '',
			...(user || {})
		});
	};
	const formValidation = Yup.object().shape({
		rut: Yup.string().required("Campo obligatorio"),
		passwordEboleta: Yup.string().required("Campo obligatorio"),
		certificate: Yup.string().required("Campo obligatorio"),
	});
	const formValidationkey = Yup.object().shape({
		key: Yup.string().required("Campo obligatorio"),
	});

	return {
		formInitialValues, formValidation, formkey, formValidationkey
	};
};

