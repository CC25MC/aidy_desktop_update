import React from 'react';
import { FormLayout } from "components";
import { Drawer, Stack, Text, Box, Button, useToasts } from 'bumbag';
import { Formik } from "formik";
import {
    TextField,
    GalleryField,
    SwatchField,
    CategoryField
} from "components/formik";
import { formInitialValues, formValidation } from "./data";
import { useHistory } from "react-router";
import { productAtom, useMutateProducts } from "hooks/models/useProducts";
import { useAtom } from 'jotai';
import { SupplierField } from '../../../components/formik/SupplierField';

const ProductForm = () => {
    const history = useHistory();
    const toasts = useToasts();
    const [product, setProduct] = useAtom(productAtom);
    const { mutateAsync: saveProduct } = useMutateProducts();
    return (
        <Formik
            initialValues={formInitialValues(product)}
            validationSchema={formValidation}
            onSubmit={(values) => {
                saveProduct(values).then(
                    () => {
                        setProduct(null);
                        if (values.id) {
                            toasts.success({
                                title: 'Producto Actualizado',
                                message: `Se ha actualizado correctamente el producto ${values.name}`
                            });
                        } else {
                            toasts.success({
                                title: 'Producto Creado',
                                message: `Se ha creado correctamente el producto ${values.name}`
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
                    <FormLayout title="Nuevo Producto" goback="productos" onGoBack={() => { setProduct(null); }}>
                        <Stack spacing="major-2">
                            <Stack orientation="horizontal" spacing="major-2">
                                <TextField name="name" label="Nombre" />
                                <TextField name="price" label="Precio" type="number" />
                            </Stack>
                            <Box>
                                <Text color="white" marginBottom="12px">
                                    Opcionales
                                </Text>
                            </Box>
                            <Stack orientation="horizontal" spacing="major-2">
                                <CategoryField name="category" label="Categoria" />
                                <TextField name="code" label="Codigo" />
                            </Stack>
                            {/* <Stack orientation="horizontal" spacing="major-2">
                                <TextField name="cost" label="Costo" /> */}
                            <Stack orientation = "horizontal" spacing = "major-2">
                                <SwatchField name="color" placeholder="Color" />
                                <SupplierField name = "supplier" label = "Proveedor" />
                            </Stack>
                            {/* </Stack>
                            <TextField type="number" label="Cantidad" name="quantity" /> */}
                            <Box>
                                <Text color="white" marginBottom="12px">
                                    Galeria
                                </Text>
                            </Box>
                            <GalleryField
                                name="images"
                                getPreview={(image) => {
                                    return image?.preview || image?.images?.path;
                                }}
                            />
                            <Button width="100%" palette="white" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Stack>
                    </FormLayout>
                </Drawer>
            )}
        </Formik>
    );
};

export { ProductForm };