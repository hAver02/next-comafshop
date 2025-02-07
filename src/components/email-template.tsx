import { ProductsCart } from "../../types/CartTypes";


interface EmailTemplateProps {
  totalAmount : number
  budgetProducts : ProductsCart[]
}


// Componente para renderizar la tabla de productos
export default function ProductsTable ({ budgetProducts, totalAmount } : EmailTemplateProps)  {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '10px' }}>Producto</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Cantidad</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Precio Unitario</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {budgetProducts.map((item : any, index : number) => (
          <tr key={index}>
            <td style={{ border: '1px solid black', padding: '10px' }}>{item.product.name}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
            <td style={{ border: '1px solid black', padding: '10px' }}>${item.price.toFixed(2)}</td>
            <td style={{ border: '1px solid black', padding: '10px' }}>
              ${(item.quantity * item.price).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td  style={{ border: '1px solid black', padding: '10px', textAlign: 'right' }}>
            <strong>Total</strong>
          </td>
          <td style={{ border: '1px solid black', padding: '10px' }}><strong>${totalAmount.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  );
};