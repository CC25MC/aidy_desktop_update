import { Fragment, useState } from 'react';
import { useField, Formik } from 'formik';
import { MUInput, TextField } from '../TextField';
import { Modal, Card, Button, Box, Input, Set, Menu, Group, Flex, Icon, useToasts } from 'bumbag';
import { useCategories, useMutateCategories, useDeleteCategories } from 'hooks/models';
import { EmptySpace } from 'components/molecules';
import * as Yup from 'yup';
import { usePagination } from "hooks";

const CategoryField = ({ name, ...restProps }) => {
    //eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const modal = Modal.useState();
    const { data: categories } = useCategories();
    const { mutateAsync: createCategory, isLoading } = useMutateCategories();
    const { mutate: deleteCategories } = useDeleteCategories();
    const [isAdding, setAdding] = useState(false);
    const toasts = useToasts();

    const {
        data: paginatedCategories,
        search
    } = usePagination({
        data: categories,
        searchBy: ["name"]
    });
    const actionDelete = (item) => {
        deleteCategories({ categoriesId: item.id });
        toasts.success({
            title: 'Categoria Eliminada',
            message: `Se ha eliminado correctamente la categoria ${item.name}`
        });
    };
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
                                title="Categorias"
                                headerAddon={
                                    <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                                }
                            >
                                <Box height="360px">
                                    {isAdding
                                        ? (
                                            <Box height="100%" display="flex" alignItems="center" width="100%">
                                                <TextField
                                                    name="name"
                                                    label="Nombre"
                                                    width="100%"
                                                />
                                            </Box>
                                        ) : (
                                            <EmptySpace
                                                show={!paginatedCategories?.length}
                                                onClick={() => {
                                                    setAdding(true);
                                                }}
                                            >
                                                <Group>
                                                    <Input
                                                        width="100%"
                                                        placeholder="Buscar"
                                                        {...search}
                                                    />
                                                    <Button palette="primary" onClick={() => {
                                                        setAdding(true);
                                                    }}>
                                                        Agregar
                                                    </Button>
                                                </Group>
                                                <Menu marginTop="major-2">
                                                    <Menu.Group
                                                        type="radio"
                                                    >
                                                        {paginatedCategories.map(category => (
                                                            <Flex>
                                                                <Menu.Item
                                                                    {...(meta.value?.id === category.id ?
                                                                        {
                                                                            iconBefore: "check",
                                                                            iconBeforeProps: {
                                                                                color: '#011A41'
                                                                            }
                                                                        } : {}
                                                                    )}
                                                                    key={category.id}
                                                                    value={category.id}
                                                                    onClick={() => {
                                                                        helpers.setValue(category);
                                                                    }}
                                                                >
                                                                    {category.name}
                                                                </Menu.Item>
                                                                <Box alignX="center" alignY="center" >
                                                                    <Icon aria-label="delete" icon="delete" onClick={() => actionDelete(category)} cursor="pointer" color="red" />
                                                                </Box>
                                                            </Flex>
                                                        ))}
                                                    </Menu.Group>
                                                </Menu>
                                            </EmptySpace>
                                        )
                                    }
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

export { CategoryField };