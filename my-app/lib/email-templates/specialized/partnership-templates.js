import { baseTemplate } from '../base'

export const partnershipTemplate = (name, partnershipDetails, type = 'welcome') => {
    const templates = {
        welcome: {
            title: "Welcome to Our Partner Program",
            content: `
                <div style="padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">Welcome to the ConsultAI Partner Program!</h1>
                    <!-- Partnership welcome content -->
                </div>
            `
        },
        milestone: {
            title: "Partnership Milestone Achieved",
            content: `
                <div style="padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">Congratulations on Your Achievement!</h1>
                    <!-- Milestone content -->
                </div>
            `
        },
        opportunity: {
            title: "New Partnership Opportunity",
            content: `
                <div style="padding: 20px;">
                    <h1 style="color: #0284c7; margin-bottom: 20px;">New Opportunity Available</h1>
                    <!-- Opportunity content -->
                </div>
            `
        }
    }

    const selectedTemplate = templates[type] || templates.welcome
    return baseTemplate(selectedTemplate.content)
}
