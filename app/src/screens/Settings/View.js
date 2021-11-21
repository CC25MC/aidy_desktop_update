import { 
    Box, 
    Disclosure, 
    Flex, 
    Text, 
    Divider, 
    Icon, 
    Tooltip, 
    Card, 
    Stack, 
    Button, 
    Alert, 
    DropdownMenu,
    Radio,
    Set
} from "bumbag";
import { Fragment } from "react";
import { AdminLayout, Header } from "components";
import { TextField, RutField } from "components/formik";
import { EmptySpace } from "components/molecules";
import { Formik, ErrorMessage } from "formik";
import { useAuth, useValidateKey } from "hooks/useClient";
import { useDefaultPrinter, usePrinters } from "hooks/usePrinters";
import { configFormInitialValues, configFormValidation, keyFormIntialValues, keyFormValidation } from "./data";
const SettingsView = () => {
    const { logout , user, updateUser } = useAuth();
    const { mutate : validateKey, data, reset } = useValidateKey();
    const { data : printers } = usePrinters();
    const { selectPrinter , printer, paper, updatePaper, paperOptions  } = useDefaultPrinter();
    return (
        <AdminLayout>
            <Header
                title="Ajustes"
                actions = {null}
            />
            <Box alignX="center" alignY="center" width="100%" height="100%">
                <Card width="50%" height="auto">
                    <Box>
                        <Formik
                            initialValues={configFormInitialValues(user)}
                            validationSchema={configFormValidation}
                            onSubmit={(values) => {
                                updateUser(values);
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Disclosure.State >
                                    <Disclosure width="100%">
                                        <Box marginTop="15px" cursor={"pointer"}>
                                            <Flex>
                                                <Text fontSize={"300"} fontWeight="semibold" color="primary">
                                                    Cuenta SII
                                                </Text>
                                                <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} >
                                                    <Tooltip width="100px" content="Configura tu cuenta SII, para poder imprimir boletas fiscales" placement="bottom">
                                                        <Icon fontSize={"300"} icon={user?.rut ? "success" : "warning"} color={user?.rut ? "success" : "warning"} />
                                                    </Tooltip>
                                                </Box>
                                            </Flex>
                                            <Divider marginTop="15px" backgroundColor="primary" />
                                        </Box>
                                    </Disclosure>
                                    <Disclosure.Content>
                                        <Stack padding="30px" orientation="horizontal" spacing="major-2">
                                            <Box>
                                                <RutField name="rut" label="Rut" />
                                                <ErrorMessage
                                                    name='rut'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                            </Box>
                                            <Box>
                                                <TextField name="passwordEboleta" type="password" label="Contraseña" />
                                                <ErrorMessage
                                                    name='passwordEboleta'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                            </Box>
                                        </Stack>
                                        <Box  padding="0px 30px 30px 30px">
                                                <TextField name="certificate"  label="Certificado" />
                                                <ErrorMessage
                                                    name='certificate'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                            </Box>
                                        <Box padding="0px 30px 30px 30px">
                                            <Button width="100%" palette="secondary" onClick={handleSubmit}>
                                                Guardar
                                            </Button>
                                        </Box>
                                    </Disclosure.Content>
                                </Disclosure.State>
                            )}

                        </Formik>
                    </Box>
                    <Box>
                        <Formik
                            initialValues={keyFormIntialValues(user)}
                            validationSchema={keyFormValidation}
                            onSubmit={ async (values) => {
                                reset();
                                const { deviceCode } = await window.getDeviceCode();
                                validateKey({ code: values.key, device: deviceCode });
                            }}
                        >
                            {({ handleSubmit }) => (
                                <Disclosure.State>
                                    <Disclosure width="100%">
                                        <Box marginTop="15px" cursor={"pointer"}>
                                            <Flex>
                                                <Text fontSize={"300"} fontWeight="semibold" color="primary">
                                                    Key de acceso completo
                                                </Text>
                                                <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} >
                                                    <Tooltip content="Ingresa tu key de acceso, y disfruta de todos los beneficios de AIDY LITE" placement="bottom">
                                                        <Icon fontSize={"300"} icon={user?.key ? "success" : "warning"} color={user?.key ? "success" : "warning"} />
                                                    </Tooltip>
                                                </Box>
                                            </Flex>
                                            <Divider marginTop="15px" backgroundColor="primary" />
                                        </Box>
                                    </Disclosure>
                                    <Disclosure.Content>
                                        <Stack padding="30px" orientation="horizontal" spacing="major-2">
                                            <Box>
                                                <TextField name="key" label="Key" />
                                                <ErrorMessage
                                                    name='key'
                                                    component='div'
                                                    className='field-error text-danger'
                                                />
                                                { data != undefined && !data.isValid && (
                                                    <Alert marginTop = "major-2" variant="tint" title="Esta Licensia no es valida" type="danger">
                                                        Has introducido una licensia incorrecta o vencida
                                                    </Alert>
                                                ) }
                                                { data != undefined && data.isValid && (
                                                    <Alert marginTop = "major-2" variant="tint" title="Validacion exitosa" type="success">
                                                        Licencia valida ahora puedes disfurtar
                                                        del todo el potencial de AIDY LITE
                                                    </Alert>
                                                )}
                                            </Box>
                                        </Stack>
                                        <Box padding="0px 30px 30px 30px">
                                            <Button width="100%" palette="secondary" onClick={handleSubmit}>
                                                Guardar
                                            </Button>
                                        </Box>
                                    </Disclosure.Content>
                                </Disclosure.State>
                            )}
                        </Formik>
                        <Disclosure.State>
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"}>
                                    <Flex>
                                        <Text fontSize={"300"} fontWeight="semibold" color="primary">
                                            Impresoras
                                        </Text>
                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box padding = "major-2">
                                    <EmptySpace 
                                        show = {!printers.length} 
                                        label = "Aun no has configurado una impresora"
                                        actions = {(
                                            <Button variant = "ghost" onClick = {() => {
                                                window.initPrinters();
                                            }}>
                                                Buscar impresoras
                                            </Button>
                                        )}
                                    >
                                        <Text> 
                                            Selecciona una impresora,
                                            utilizaremos el dispositivo para 
                                            imprimir tus facturas y documentos
                                        </Text>
                                        <DropdownMenu
                                            menu={
                                                <Fragment>
                                                    {printers.map( (printer,id) => (
                                                        <DropdownMenu.Item 
                                                            onClick = { () => {
                                                                selectPrinter(printer);
                                                            }}
                                                            key = {`printer-${id}`} 
                                                            color = "#FFF"
                                                            _hover = {{
                                                                color: '#000'
                                                            }}
                                                        >
                                                            {printer}
                                                        </DropdownMenu.Item>
                                                    ))}
                                                </Fragment>
                                            }
                                            >
                                            <Button onClick = {() => {

                                            }} marginTop = "major-2" iconAfter="chevron-down" width = "100%" variant = "outline">
                                                { printer ?? 'Seleccionar impresora' }
                                            </Button>
                                            </DropdownMenu>
                                    </EmptySpace>
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                        <Disclosure.State>
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"}>
                                    <Flex>
                                        <Text fontSize={"300"} fontWeight="semibold" color="primary">
                                            Tipo de papel
                                        </Text>
                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box width = "100%">
                                    <Text>
                                        Seleccione tipo de papel
                                    </Text>
                                    {paperOptions.map( p => (
                                        <Set marginTop = "major-2">
                                            <Box key = {p.id}>
                                                <Radio 
                                                    label = {p.measure}
                                                    checked = {p.id === paper.id}
                                                    onChange = { () =>{
                                                        updatePaper(p)
                                                    }}
                                                />
                                            </Box>
                                        </Set>
                                    ))}
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                    </Box>
                    <Box marginTop="15px" width="100%" cursor={"pointer"} onClick={logout}>
                        <Flex>
                            <Text fontSize={"300"} fontWeight="semibold" color="primary">
                                Cerrar Sesión
                            </Text>
                            <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} >
                                <Icon fontSize={"300"} icon={"logout"} color="red" />
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Box>
        </AdminLayout>
    );
};
export default SettingsView;

