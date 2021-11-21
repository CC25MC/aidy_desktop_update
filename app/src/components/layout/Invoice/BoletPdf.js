import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from "assets/Logo.png";

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        height: "100%",
        padding: "40px",
        fontSize:"24px"
    },
});

// Create Document Component
const BoletPdf = ({ invoice, user }) => {
    return <Document>
        <Page size="FOLIO" style={styles.page}>
            <View style={{ textAlign: "center" }}>
                <Image src={Logo} style={{ width: "200px", height: "200px", alignSelf: "center" }} />
            </View>
            <View style={{ textAlign: "center" }}>
                <Text>
                    Ref Vendedor: {user?.rut}
                </Text>
                <Text>
                    Orella 1780, Iquique, iquique
                </Text>
            </View>
            <View style={{ padding: "20px" }}>
                <Text>
                    {invoice?.client?.name ? `Cliente: ${invoice?.client?.name} ${invoice?.client?.lastname}` : null}
                </Text>
            </View>
            <View style={{ marginTop: 20, }} />
            <View
                style={{
                    display: "flex",
                    marginTop: 20,
                    flexDirection: "row",
                    padding: "20px"
                }}
            >
                <Text>
                    Producto
                </Text>
                <Text style={{ marginLeft: "auto" }}>
                    Mónto
                </Text>
            </View>
            <View style={{ width: "100%", borderTop: 1, marginTop: 5, borderColor: "#000000" }} />
            {invoice.checkoutList.map((item, key) => (
                <View
                    key={key}
                    style={{
                        display: "flex",
                        marginTop: 20,
                        flexDirection: "row",
                        padding: "20px"
                    }}
                >
                    <Text>
                        {`${item.quantity} x ${item.name || item.product_name}`}
                    </Text>
                    <Text style={{ marginLeft: "auto" }}>
                        {`$ ${item.total || (item.quantity * item.price)}`}
                    </Text>
                </View>
            ))}

            <View style={{ width: "100%", borderTop: 1, marginTop: 20, borderColor: "#000000" }} />
            <View style={{ padding: "20px" }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Text />

                    <Text style={{ marginLeft: "auto" }}>
                        IVA: $12
                    </Text>
                </View>
                {invoice?.discount > 0 && (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Text />
                        <Text style={{ marginLeft: "auto" }}>
                            Descuento: %{invoice?.discount}
                        </Text>
                    </View>
                )}

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Text />
                    <Text style={{ marginLeft: "auto" }}>
                        Total: ${invoice?.total}
                    </Text>
                </View>

            </View>
            <View style={{ padding: "20px" }}>
                <Text>
                    Fecha: {invoice.date}
                </Text>
            </View>
        </Page>
    </Document>;
};

export default BoletPdf;