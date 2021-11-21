import { Formik, ErrorMessage } from 'formik';
import { useAtom } from 'jotai';
import * as Yup from 'yup';
import { useToasts, Drawer, Stack, Box, Button } from 'bumbag';
import { supplierAtom } from 'hooks/models/useSuppliers';
import { useMutateSupplier } from 'hooks/models/useSuppliers';
import { FormLayout } from "components";
import { TextField, PhoneField} from "components/formik";
import { useHistory } from 'react-router';

const SupplierForm = () => {
    const toasts = useToasts();
    const history = useHistory();
    const [ supplier, setSupplier ] = useAtom( supplierAtom );
    const { mutateAsync : saveSupplier } = useMutateSupplier();
    return (
        <Formik
            initialValues={formInitialValues(supplier)}
            validationSchema={formValidation}
            onSubmit={(values) => {
                saveSupplier(values).then(
                    () => {
                        setSupplier(null);
                        if (values.id) {
                            toasts.success({
                                title: 'Proveedor Actualizado',
                                message: `Se ha actualizado correctamente el proveedor ${values.name}`
                            });
                        } else {
                            toasts.success({
                                title: 'Proveedor Creado',
                                message: `Se ha creado correctamente el proveedor ${values.name}`
                            });
                        }
                        history.push("/productos");
                    }
                );

            }}
        >
            {({ handleSubmit }) => (
                <Drawer isFullScreen={true} visible={true} style={{
                    zIndex: 1960
                }}>
                    <FormLayout title="Nuevo Proveeder" alignX="center" goback="client" onGoBack={() => { setClient(null); }}>
                        <Stack spacing="major-2">
                            <Stack orientation="horizontal" spacing="major-2">
                                <Box>
                                    <TextField name="name" label="Nombre" />
                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                            </Stack>
                            <Stack orientation="horizontal" spacing="major-2">
                                <Box>
                                    <TextField name="address" label="Direccion" />
                                    <ErrorMessage
                                        name='address'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                                <Box>
                                    <PhoneField name="phone" label="Teléfono" />
                                    <ErrorMessage
                                        name='phone'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                            </Stack>
                            <Button width="100%" palette="white" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Stack>
                    </FormLayout>
                </Drawer>
            )}
        </Formik>
    );
}

const formValidation = Yup.object().shape({
    name: Yup.string().required("Campo obligatorio")
})

const formInitialValues = (supplier) => {
    return ({
        name: '',
        address: '',
        phone: '+56',
        ...supplier
    })
}

export { SupplierForm };