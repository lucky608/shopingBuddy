import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddRemoveContainer from '../sharedcomponents/AddRemoveContainer';
import { useDispatch } from 'react-redux';
import { decreaseCartData, deleteDataFromCart, increaseCartData } from '../sharedstore/slices/CartProduct';
import { InputAdornment, TextField } from '@mui/material';
import { SharedButton } from '../sharedcomponents/SharedButton';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(data) {
    const total = data.reduce((acc, item) => {
        return acc + item.prize * item.qty;
    }, 0);

    return total;
}

const rows = [
    {
        productName: "abc",
        prize: 100,
        weight: 10,
        qty: 5,
        price: 500
    }
];



export default function ProductTable({ CartData, onCheckOutClick, setTotalAmountToPay }) {
    const dispatch = useDispatch();
    const [invoiceTotal, setInvoiceTotal] = React.useState(0);
    const [invoiceSubtotal, setInvoiceSubtotal] = React.useState(0);
    const [invoiceTaxes, setInvoiceTaxes] = React.useState(0);
    const [discountAmount, setDiscountAmount] = React.useState(0);
    const [isDiscountEditing, setIsDiscountEditing] = React.useState(false);
    const [discount, setDiscount] = React.useState(0);
    const [isTaxEditing, setIsTaxEditing] = React.useState(false);
    const [tax, setTax] = React.useState(49);
    console.log(onCheckOutClick);
    // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    React.useEffect(() => {
        const invoiceSubtotalData = subtotal(CartData);
        setInvoiceSubtotal(invoiceSubtotalData)
        setInvoiceTaxes((tax * invoiceSubtotalData) / 100);
        setDiscountAmount((discount * invoiceSubtotalData) / 100)
        setInvoiceTotal(
            invoiceSubtotalData + tax)
        console.log(CartData, "yes");
        setTotalAmountToPay((invoiceSubtotalData + ((tax / 100) * invoiceSubtotalData))
            -
            (discount * invoiceSubtotalData) / 100)
    }, [CartData, tax, discount])
    const onClick = () => {
        console.log("hello");
    }
    //const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    const onAddClick = (productId) => {
        console.log(productId, "add click");
        dispatch(increaseCartData(productId))
    }

    const onRemoveClick = (productId) => {
        console.log("remove click");
        dispatch(decreaseCartData(productId))
    }
    const OnDelete = (productId) => {
        dispatch(deleteDataFromCart(productId))
    }



    const handleDiscountClick = () => {
        setIsDiscountEditing(true);
    };

    const handleTaxClick = () => {
        setIsTaxEditing(true);
    };

    const handleBlurDiscount = () => {
        setIsDiscountEditing(false);
        // onEdit(discount); // Pass the edited value to the parent component or handle it as needed
    };
    const handleBlurTax = () => {
        setIsTaxEditing(false);
        // onEdit(discount); // Pass the edited value to the parent component or handle it as needed
    };

    const handleChangeDiscount = (e) => {
        setDiscount(e.target.value);
    };
    const handleChangeTax = (e) => {
        setTax(e.target.value);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    {/* <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow> */}
                    <TableRow>
                        <TableCell >Product Name</TableCell>
                        {/* <TableCell align="right">Weight/Unit</TableCell> */}
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right">Rs/Unit</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        {/* <TableCell align="right">Total Weight</TableCell> */}
                        <TableCell align="right">Sum</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {CartData.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell >{row.name}</TableCell>
                            {/* <TableCell align="right">{row.weight}</TableCell> */}
                            <TableCell align="right">{row.size}</TableCell>
                            <TableCell align="right">{row.prize}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            {/* <TableCell align="right">{row.qty * row.weight}</TableCell> */}
                            <TableCell align="right">{ccyFormat(row.prize * row.qty)}</TableCell>
                            <TableCell align="right">
                                <AddRemoveContainer
                                    onAddClick={onAddClick}
                                    onRemoveClick={onRemoveClick}
                                    productUnit={row.qty}
                                    productId={row.id}
                                    OnDelete={OnDelete}
                                />

                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell align="center" colSpan={3} sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "600" }}>{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={3} sx={{  fontWeight: "bold" }}>Delivery Charge</TableCell>
                        {/* <TableCell >
                            {/* {isTaxEditing ? (
                                <TextField
                                    sx={{ width: "50px" }}
                                    id="standard-basic"
                                    variant="standard"
                                    value={tax}
                                    onChange={handleChangeTax}
                                    onBlur={handleBlurTax}
                                    autoFocus
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                />
                            ) : ( 
                                ₹{tax}
                            {/* )} 
                            {/* {`${(TAX_RATE * 100).toFixed(0)} %`} 
                        </TableCell> */}
                        <TableCell align="right" sx={{ fontWeight: "600" }}>{tax}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                        <TableCell align="center" colSpan={3} sx={{ paddingLeft: '14vw', fontWeight: "bold" }}>Discount</TableCell>
                        <TableCell onClick={handleDiscountClick} sx={{ textDecoration: "underLine", backgroundColor: "#D2EFA8" }}>
                            {isDiscountEditing ? (
                                <TextField
                                    sx={{ width: "50px" }}
                                    id="standard-basic"
                                    variant="standard"
                                    value={discount}
                                    onChange={handleChangeDiscount}
                                    onBlur={handleBlurDiscount}
                                    autoFocus
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                />
                            ) : (
                                `${discount} %`
                            )}
                            {/* {`${(TAX_RATE * 100).toFixed(0)} %`} */}
                        {/* </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "600" }}>{ccyFormat(discountAmount)}</TableCell>
                    </TableRow> */} 
                   
                    <TableRow>
                        <TableCell align="center" colSpan={3} sx={{ fontWeight: "900" }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "900" }}>{`₹${ccyFormat(invoiceTotal)}`}</TableCell>
                        <TableCell align="left">
                            <SharedButton
                                OnClick={onCheckOutClick}
                                label="Checkout"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}