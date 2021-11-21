import { Fragment, useState } from 'react';
import { useField, Formik } from 'formik';
import { MUInput } from '../TextField';
import { Modal, Card, Button, Box, Input, Set, Menu, Group, Flex, Icon, useToasts } from 'bumbag';
import { EmptySpace } from 'components/molecules';
import * as Yup from 'yup';
import { useSuppliers, useMutateSupplier, useDeleteSuppliers } from 'hooks/models/useSuppliers';
import { useHistory } from 'react-router';

const SupplierField = ({ name, ...restProps }) => {
    //eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const modal = Modal.useState();
    const { data: suppliers } = useSuppliers();
    const { mutateAsync: createCategory, isLoading } = useMutateSupplier();
    const { mutate: deleteCategories } = useDeleteSuppliers();
    const [isAdding, setAdding] = useState(false);
    const toasts = useToasts();
    const history = useHistory();

    return (
        <Fragment>
            <MUInput
                containLabel={true}
                value={meta.value?.id ? meta.value.name : ""}
                onClick={(event) => {
                    event.preventDefault();
                    modal.show();
                }}
                {...restProps}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    createCategory(values).then(
                        () => {
                            setAdding(false);
                        }
                    );
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <Modal {...modal} style={{
                            minWidth: 460
                        }}>
                            <Card
                                {...(isAdding ? {
                                    footer: (
                                        <Set>
                                            <Button isLoading={isLoading} palette="primary" onClick={() => {
                                                handleSubmit();
                                            }}>
                                                Agregar
                                            </Button>
                                            <Button disabled={isLoading} variant="ghost" onClick={() => {
                                                setAdding(false);
                                            }}>
                                                Cancelar
                                            </Button>
                                        </Set>
                                    )
                                } : {
                                    footer: (
                                        <Set>
                                            <Button variant="ghost" onClick={() => {
                                                modal.hide();
                                            }}>
                                                OK
                                            </Button>
                                        </Set>
                                    )
                                })}
                                title="Proveedores"
                                headerAddon={
                                    <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                                }
                            >
                                <Box height="360px">
                                    <EmptySpace
                                        show={!suppliers.length}
                                        onClick={() => {
                                            history.push('productos/proveedores/agregar');
                                        }}
                                    >
                                        <Group>
                                            <Input
                                                width="100%"
                                                placeholder="Buscar"
                                            />
                                            <Button palette="primary" onClick={() => {
                                                history.push('productos/proveedores/agregar');
                                            }}>
                                                Agregar
                                            </Button>
                                        </Group>
                                        <Menu marginTop="major-2">
                                            <Menu.Group
                                                type="radio"
                                            >
                                                {suppliers.map(supplier => (
                                                    <Flex>
                                                        <Menu.Item
                                                            {...(meta.value?.id === supplier.id ?
                                                                {
                                                                    iconBefore: "check",
                                                                    iconBeforeProps: {
                                                                        color: '#011A41'
                                                                    }
                                                                } : {}
                                                            )}
                                                            key={supplier.id}
                                                            value={supplier.id}
                                                            onClick={() => {
                                                                helpers.setValue(supplier);
                                                            }}
                                                        >
                                                            {supplier.name}
                                                        </Menu.Item>
                                                        <Box alignX="center" alignY="center" >
                                                            <Icon aria-label="delete" icon="delete" onClick={() => actionDelete(supplier)} cursor="pointer" color="red" />
                                                        </Box>
                                                    </Flex>
                                                ))}
                                            </Menu.Group>
                                        </Menu>
                                    </EmptySpace>
                                </Box>
                            </Card>
                        </Modal>
                    );
                }}
            </Formik>
        </Fragment>
    );
};

const initialValues = {
    name: ''
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obligatorio")
});

export { SupplierField };