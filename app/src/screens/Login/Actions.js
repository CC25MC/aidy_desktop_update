import * as Yup from 'yup';

export const Actions = () => {
	const formInitialValues = {
		name: '',
		lastname: '',
		email: '',
		password: '',
	};
	const formInitialLogin = {
		email: '',
		password: '',
	};
	const formValidation = Yup.object().shape({
		name: Yup.string().required("Campo obligatorio"),
		lastname: Yup.string().required("Campo obligatorio"),
		email: Yup.string().email('Email Invalido').required("Campo obligatorio"),
		password: Yup.string().required("Campo obligatorio"),
	});

	const formValidationLogin = Yup.object().shape({
		email: Yup.string().email('Email Invalido').required("Campo obligatorio"),
		password: Yup.string().required("Campo obligatorio"),
	});
	return {
		formInitialValues, formValidation, formInitialLogin, formValidationLogin
	};
};

