import { FormLayout, ShareIcon, PrinterIcon } from "components";
import { Drawer, Box, Modal, Flex, Icon, Text, Card, useToasts, Button, Set } from 'bumbag';
import BoletPdf from "components/layout/Invoice/BoletPdf";
import { usePDF } from '@react-pdf/renderer';
import { useAuth, useValidateKey } from 'hooks/useClient';
import { useState, useEffect } from "react";
import { useDefaultPrinter } from 'hooks/usePrinters';
import { Link } from 'react-router-dom';
import { useAsync, useNuxo } from 'hooks';
import { useHistory } from 'react-router';
import { convertPDFToImage, resizeImage } from 'utils';

const BoletaForm = ({ item }) => {
    const { user } = useAuth();
    const { mutateAsync: validateKey } = useValidateKey();
    const { printFromUrl, paper, printFromLocal } = useDefaultPrinter();
    const toasts = useToasts();
    const modal = Modal.useState();
    const { createBoleta } = useNuxo();
    const [PDFInstance] = usePDF({ document: BoletPdf({ invoice: { checkoutList: item?.history, total: item?.total, date: item?.date, client: item?.client }, user }) })
    const { run, isLoading, data: ticket } = useAsync();
    const [type, setType] = useState(false);
    const history = useHistory();
    const [img, setImg] = useState(null);
    useEffect(() => {
        if (!PDFInstance.isLoading && PDFInstance.blob) {
            const blob = PDFInstance.blob;
            blob.arrayBuffer().then(async buffer => {
                try {
                    const data = new Uint8Array(buffer);
                    const { image } = await convertPDFToImage({
                        data
                    });
                    setImg(image);
                } catch (err) {
                    console.log(err);
                }
            });
        }
    }, [PDFInstance]);
    return (
        <Drawer isFullScreen={true} visible={true} style={{
            zIndex: 1960
        }}>
            <FormLayout title={`Folio #${item.folio || item.id}`} goback="history" >
                <Modal {...modal} style={{
                    minWidth: 460
                }} >
                    <Card
                        title="Aun no puedes generar boletas"
                        footer={(
                            <Set>
                                <Button palette="primary" use={Link} to="/settings">
                                    Ir a ajustes
                                </Button>
                                <Button variant="ghost" onClick={() => {
                                    modal.hide();
                                }}>
                                    Cancelar
                                </Button>
                            </Set>
                        )}
                        headerAddon={
                            <Modal.Disclosure {...modal} use={Button.Close}>Close</Modal.Disclosure>
                        }
                    >
                        <Text>
                            Debes configurar tus datos
                            en el menu de ajustes
                            para poder generar boletas
                            {user.key ? `
                            Debes configurar tus datos 
                            en el menu de ajustes
                            para poder generar boletas 
                        ` : `No tienes una licensia para usar AIDY, 
                            configura una en el menu de ajustes
                        `}
                        </Text>
                    </Card>
                </Modal>
                <Box 
                    width="100%" 
                    height="81vh" 
                    alignX={"left"} 
                    alignY="bottom" 
                    padding="10px" 
                    backgroundColor="white" 
                    display = "flex"
                    alignItems = "center"
                    justifyContent = "center"
                    flexDirection = "column"
                >
                    {item?.ticket?.preview && type ? (
                        <Box style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url('${item?.ticket?.preview?.replace(/\\/g, "/")}')`,
                            width: "40%",
                            backgroundPosition: "center",
                            backgroundAttachment: "absolute",
                            backgroundSize: "contain",
                            height: "100vh",
                        }} />
                    ) :
                        <Box style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url('${img}')`,
                            width: "40%",
                            backgroundPosition: "center",
                            backgroundAttachment: "absolute",
                            backgroundSize: "contain",
                            height: "100vh",
                        }} />
                    }
                    <Flex width="100%">
                        <Box alignX={"center"} alignY="center" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={"not-allowed"} >
                            <ShareIcon size="large" color="#2E6FD3" />
                        </Box>
                        <Box onClick={async () => {
                            if (!paper && !paper.width) {
                                toasts.warning({
                                    title: "Configuracion faltante",
                                    message: "Aun no has configurado un papel para imprimir, dirigete a ajustes y elige un tipo de papel"
                                });
                                return;
                            }
                            if (ticket) {
                                const { image } = await convertPDFToImage({ url: ticket.preview });
                                const { base64Data } = await resizeImage({
                                    image,
                                    width: paper.width,
                                    height: "auto"
                                });
                                const filepath = await window.writeFile({
                                    buffer: base64Data,
                                    filename: `temp-${billsId}`,
                                    saveIn: "temp"
                                });
                                printFromLocal(filepath);
                            } else {
                                if (img) {
                                    const { image: resizedImage, base64Data } = await resizeImage({
                                        img,
                                        width: paper.width,
                                        height: "auto"
                                    });
                                    const filepath = await window.writeFile({
                                        buffer: base64Data,
                                        filename: `temp-${item?.id}`,
                                        saveIn: "temp"
                                    });
                                    printFromLocal(filepath);
                                }
                            }
                        }} alignX={"center"} alignY="center" marginLeft="10px" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={"pointer"} >
                            <PrinterIcon size="large" color="#2E6FD3" />
                        </Box>
                        <Box onClick={() => {
                            if (item?.ticket && type) {
                                window.openExternal(item?.ticket?.path);
                            }else{
                                window.openExternal(img);
                            }
                        }} alignX={"center"} alignY="center" marginLeft="10px" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={"pointer"} >
                            <Icon icon={"download"} fontSize="400" color="#2E6FD3" />
                        </Box>
                        {item?.ticket?.preview ?
                            <Box alignX={"center"} alignY="center" marginLeft="auto" borderRadius={"2"} padding="5px" width={"auto"} height="42px" backgroundColor="btn" onClick={() => { setType(!type); }} cursor={"pointer"} >
                                <Text fontSize={"100"} color="#2E6FD3">
                                    {type ? "Ver Boleta Aidy" : "Ver Boleta Obtenida del SII"}
                                </Text>
                            </Box>
                            :
                            !ticket ? <Box alignX={"center"} alignY="center" marginLeft="auto">
                                <Button
                                    width={"auto"}
                                    fontWeight="normal"
                                    padding="5px"
                                    marginTop="20px"
                                    palette={"btn"}
                                    isLoading={isLoading}
                                    onClick={() => {
                                        let currentUser = user;
                                        if (currentUser && currentUser.rut && currentUser.passwordEboleta && currentUser.key) {
                                            const params = {
                                                user: currentUser.rut,
                                                password: currentUser.passwordEboleta,
                                                amount: item?.total,
                                                rut: currentUser.rut,
                                                certificatePassword: currentUser.certificate || "",
                                                empOption: "",
                                                billsId: item?.id
                                            };
                                            validateKey({ code: currentUser.key, id: currentUser.id }).then(validation => {
                                                if (validation.isValid) {
                                                    run(createBoleta(params));
                                                    setTimeout(() => {
                                                        toasts.success({
                                                            title: 'Boleta Generada con Exito',
                                                            message: `Por un monto de $ ${item?.total}`
                                                        });
                                                        history.push("/pos");
                                                    }, 40000);
                                                } else {
                                                    toasts.danger({
                                                        title: 'Licencia invalida',
                                                        message: 'Tu licencia ha expirado o fue revocada por favor dirigete al menu de ajustes y verifica nuevamente tu Key'
                                                    });
                                                }
                                            });
                                        } else {
                                            modal.show();
                                        }
                                    }}
                                >
                                    <Text fontSize={"100"} color="#2E6FD3">
                                        Generar Boleta SII
                                    </Text>
                                </Button>
                            </Box>
                                : null
                        }

                        <Box marginLeft="auto" alignX={"center"} width={"auto"} alignY="center">
                            <Text fontSize={"100"} color="primary">
                                {type ? "Boleta Obtenida del SII" : "Boleta Generada por Aidy"}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </FormLayout>
        </Drawer>

    );
};

export { BoletaForm };