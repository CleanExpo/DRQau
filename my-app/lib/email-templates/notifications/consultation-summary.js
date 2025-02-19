import { baseTemplate } from '../base'

export const consultationSummaryTemplate = (name, summary) => {
    const content = `
        <div style="text-align: center; padding: 20px;">
            <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">
                Consultation Summary
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: left;">
                <h2 style="color: #0284c7; font-size: 20px; margin-bottom: 15px;">
                    Key Points Discussed
                </h2>
                
                <div style="color: #666; margin-bottom: 20px;">
                    ${summary.keyPoints.map(point => `
                        <div style="margin-bottom: 10px; padding-left: 20px; border-left: 3px solid #0284c7;">
                            ${point}
                        </div>
                    `).join('')}
                </div>

                ${summary.actionItems.length > 0 ? `
                    <h3 style="color: #333; font-size: 18px; margin: 20px 0 15px;">
                        Action Items
                    </h3>
                    <ul style="color: #666; margin: 0; padding-left: 20px;">
                        ${summary.actionItems.map(item => `
                            <li style="margin-bottom: 8px;">${item}</li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>

            <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/consultations/${summary.consultationId}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 5px;">
                    View Full Details
                </a>
            </div>

            ${summary.nextSteps ? `
                <div style="margin-top: 20px; padding: 20px; background-color: #f0f9ff; border-radius: 5px; text-align: left;">
                    <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Next Steps:</h3>
                    <p style="color: #666; margin: 0;">${summary.nextSteps}</p>
                </div>
            ` : ''}
        </div>
    `
    return baseTemplate(content)
}
