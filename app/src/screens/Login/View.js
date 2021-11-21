import React from 'react';
import { BackgroundImage, Button } from "components";
import { Box, Columns, Text, Tabs, Link } from 'bumbag';
import { Formik, ErrorMessage } from "formik";
import { TextField } from "components/formik";
import { useMutateUser } from "hooks/models/useUsers";
import { useAuth } from "hooks/useClient";
import { Redirect } from "react-router";

const TabLogin = ({ formInitialValues, formValidation }) => {
	const { login , loginAsGuest } = useAuth();
	return <Box width="407px" height="468px">
		<Formik
			initialValues={formInitialValues}
			validationSchema={formValidation}
			onSubmit={(values) => {
				login({
					identifier: values.email,
					password: values.password
				});
			}}
		>
			{({ handleSubmit }) => (
				<>
					<Box>
						<TextField name="email" label="Correo" />
						<ErrorMessage
							name='email'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Box marginTop={"10px"}>
						<TextField name="password" label="Contraseña" />
						<ErrorMessage
							name='password'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Box marginTop={"5px"} />
					{/* <Link href={"POS"} fontSize="100" color={"secondary"}>
						¿Olvidaste tu contraseña?
					</Link > */}
					<Box marginTop={"155px"} />
					<Button width={"100%"} palette={"white"} onClick={handleSubmit} >
						Ingresar
					</Button>
					<Button variant = "ghost" palette = "secondary" width = "100%" marginTop = "major-2" onClick = {loginAsGuest}>
						Entrar como invitado
					</Button>
				</>
			)}

		</Formik>

	</Box>;
};

const TabRegister = ({ formInitialValues, formValidation }) => {
	//eslint-disable-next-line
	const { mutateAsync: saveUser }= useMutateUser();
	//eslint-disable-next-line
	const { register } = useAuth();
	return <Box width="407px" height="468px">
		<Formik
			initialValues={formInitialValues}
			validationSchema={formValidation}
			onSubmit={(values) => {
				register(values);
				//saveUser(values);
			}}
		>
			{({ handleSubmit }) => (
				<>
					<Box>
						<TextField name="name" label="Nombre" />
						<ErrorMessage
							name='name'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Box marginTop={"10px"}>
						<TextField name="lastname" label="Apellido" />
						<ErrorMessage
							name='lastname'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Box marginTop={"10px"}>
						<TextField name="email" label="Correo" />
						<ErrorMessage
							name='email'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Box marginTop={"10px"}>
						<TextField name="password" label="Password" />
						<ErrorMessage
							name='password'
							component='div'
							className='field-error text-danger'
						/>
					</Box>
					<Button marginTop={"50px"} width={"100%"} palette={"white"} onClick={handleSubmit}>
						Registrate
					</Button>
				</>
			)}
		</Formik>
	</Box>;
};

const LoginView = ({ formInitialValues, formValidation, formInitialLogin, formValidationLogin }) => {
	const { user } = useAuth();
	if( user?.isGuest || user?.name ){
		return <Redirect to = "/POS" />;
	}
	return (
	<Box 
		width = "100%" 
		height = "100%" 
		position = "relative" 
		overflowY = "scroll" 
		backgroundColor = "primary"
	>
		<BackgroundImage>
			<Box 
				display = {{
					mobile: 'none',
					tablet: 'none',
					desktop: 'none'
				}}
				width = {{
					default: "400px",
					fullHD: "550px"
				}}
				style={{
					height: "108px",
					marginLeft: "5%",
					marginTop: "3%",
					position: "fixed"
				}}
			>
				<Text 
					fontSize={{
						default: "36px",
						fullHD: "600"
					}} 
					color={"white"}
				>
					Que vender y comprar sea fácil para ti y tus clientes.
				</Text>
			</Box>

			<Box alignX="center" alignY="center" backgroundColor="primary" style={{
				width: "406px",
				height: "97px",
				marginLeft: "15%",
				marginTop: "745px",
				borderRadius: "8px",
				position: "fixed"
			}}>
				<Text color={"white"}>
					Mantén tú stock organizado
				</Text >
			</Box>

			<Box 
				alignX="center" 
				width="512px"  
				backgroundColor="primary" 
				style={{
					right: "100px",
					marginTop: "80px",
					position: "absolute",
					zIndex: 2,
					borderRadius: "8px",
				}}
			>
				<Box style={{ marginTop: "63px" }} />
				<Text fontSize="600" color={"white"}>
					AIDY LITE
				</Text>
				<Box style={{ marginTop: "50px" }} />
				<Tabs isFitted defaultSelectedId="tab1">
					<Tabs.List palette={"secondary"}>
						<Tabs.Tab tabId="tab1">Ingresa</Tabs.Tab>
						<Tabs.Tab tabId="tab2">Registrate</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel alignX="center" tabId="tab1" padding="major-2">
						<Box style={{ marginTop: "50px" }} />
						<TabLogin formInitialValues={formInitialLogin} formValidation={formValidationLogin} />
					</Tabs.Panel>
					<Tabs.Panel alignX="center" tabId="tab2" padding="major-2">
						<Box style={{ marginTop: "50px" }} />
						<TabRegister formInitialValues={formInitialValues} formValidation={formValidation} />
					</Tabs.Panel>
				</Tabs>
				<Box alignY="bottom">
					<Text fontSize="100" color={"white"}>
						Al crear una cuenta usted acepta los <Text color={"secondary"}>términos y condiciones.</Text>
					</Text >
				</Box>
			</Box>
			<Box alignY="bottom" height="100%" >
				<Columns isGapless>
					<Box width="50%" height="8px" backgroundColor="muted" style={{ zIndex: 1 }} />
					<Box width="50%" height="8px" backgroundColor="light" style={{ zIndex: 1 }} />
				</Columns>
				<Box width="100%" height="100px" backgroundColor="primary" style={{ zIndex: 1 }} />
			</Box>
		</BackgroundImage>
	</Box>
	);
};
export default LoginView;

