import { baseTemplate } from '../base'

export const reportTemplate = (name, reportData) => {
    const content = `
        <div style="padding: 20px;">
            <h2 style="color: #0284c7; margin-bottom: 20px;">${reportData.title}</h2>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #333;">Period: ${reportData.period}</h3>
                    <p style="color: #666;">${reportData.description}</p>
                </div>

                ${reportData.metrics ? `
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
                        ${Object.entries(reportData.metrics).map(([key, value]) => `
                            <div style="background: white; padding: 15px; border-radius: 4px;">
                                <h4 style="color: #0284c7; margin: 0 0 5px 0;">${key}</h4>
                                <div style="font-size: 24px; font-weight: bold;">${value}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${reportData.trends ? `
                    <div style="margin-top: 30px;">
                        <h3 style="color: #333; margin-bottom: 15px;">Key Trends</h3>
                        <ul style="color: #666;">
                            ${reportData.trends.map(trend => `
                                <li style="margin-bottom: 10px;">
                                    <strong>${trend.label}:</strong> ${trend.value}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/reports/${reportData.id}"
                   style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    View Full Report
                </a>
            </div>

            ${reportData.recommendations ? `
                <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #0284c7; margin-bottom: 15px;">Recommendations</h3>
                    <ul style="color: #666;">
                        ${reportData.recommendations.map(rec => `
                            <li style="margin-bottom: 10px;">${rec}</li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `

    return baseTemplate(content)
}
