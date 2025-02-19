import { baseTemplate } from '../base'

export const subscriptionTemplate = (name, subscriptionDetails) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return '#28a745'
            case 'pending': return '#ffc107'
            case 'expired': return '#dc3545'
            default: return '#6c757d'
        }
    }

    const content = `
        <div style="padding: 20px;">
            <h2 style="color: #0284c7; margin-bottom: 20px;">Subscription Update</h2>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="margin-bottom: 15px;">
                    <span style="display: inline-block; padding: 6px 12px; background: ${getStatusColor(subscriptionDetails.status)}; color: white; border-radius: 20px;">
                        ${subscriptionDetails.status}
                    </span>
                </div>

                <h3 style="color: #333; margin-bottom: 15px;">Plan Details</h3>
                <div style="color: #666;">
                    <p><strong>Plan:</strong> ${subscriptionDetails.planName}</p>
                    <p><strong>Billing Period:</strong> ${subscriptionDetails.billingPeriod}</p>
                    <p><strong>Next Billing Date:</strong> ${new Date(subscriptionDetails.nextBillingDate).toLocaleDateString()}</p>
                </div>

                ${subscriptionDetails.features ? `
                    <div style="margin-top: 20px;">
                        <h4 style="color: #333; margin-bottom: 10px;">Included Features:</h4>
                        <ul style="color: #666;">
                            ${subscriptionDetails.features.map(feature => `
                                <li style="margin-bottom: 5px;">✓ ${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/subscription/manage"
                   style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    Manage Subscription
                </a>
            </div>

            ${subscriptionDetails.message ? `
                <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p style="color: #0284c7; margin: 0;">${subscriptionDetails.message}</p>
                </div>
            ` : ''}
        </div>
    `

    return baseTemplate(content)
}
