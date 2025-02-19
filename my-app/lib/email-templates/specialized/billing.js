import { baseTemplate } from '../base'

export const billingTemplate = (name, billDetails) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const content = `
        <div style="padding: 20px;">
            <div style="text-align: right; margin-bottom: 30px;">
                <p style="color: #666;">Invoice #: ${billDetails.invoiceNumber}</p>
                <p style="color: #666;">Date: ${new Date(billDetails.date).toLocaleDateString()}</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h2 style="color: #0284c7;">Invoice Summary</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Description</th>
                            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${billDetails.items.map(item => `
                            <tr>
                                <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
                                    <div style="font-weight: 500;">${item.description}</div>
                                    ${item.details ? `<div style="color: #666; font-size: 0.9em;">${item.details}</div>` : ''}
                                </td>
                                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">
                                    ${formatCurrency(item.amount)}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr style="background: #f8f9fa;">
                            <td style="padding: 12px; font-weight: bold;">Total</td>
                            <td style="padding: 12px; text-align: right; font-weight: bold;">
                                ${formatCurrency(billDetails.total)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${billDetails.paymentUrl}"
                   style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    Pay Now
                </a>
            </div>

            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">Payment Terms</h3>
                <p style="color: #666; margin: 0;">
                    Payment is due within ${billDetails.paymentTerms} days. Please include your invoice number 
                    when making payment. For any questions about this invoice, please contact our billing department.
                </p>
            </div>
        </div>
    `

    return baseTemplate(content)
}
