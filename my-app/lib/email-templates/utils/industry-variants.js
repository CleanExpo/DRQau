export const industryVariants = {
    healthcare: {
        styles: {
            colors: {
                primary: '#4CAF50',
                secondary: '#E8F5E9',
                accent: '#81C784'
            },
            fonts: {
                primary: 'Arial, sans-serif',
                secondary: 'Georgia, serif'
            },
            imagery: {
                icons: '🏥 👨‍⚕️ 💉 🩺',
                headerImage: 'healthcare-header.jpg'
            }
        },
        terminology: {
            user: 'patient',
            consultation: 'appointment',
            advisor: 'healthcare provider'
        },
        compliance: {
            disclaimer: 'This message contains confidential medical information...',
            regulations: ['HIPAA', 'HITECH']
        }
    },
    legal: {
        styles: {
            colors: {
                primary: '#3F51B5',
                secondary: '#E8EAF6',
                accent: '#7986CB'
            },
            fonts: {
                primary: 'Times New Roman, serif',
                secondary: 'Arial, sans-serif'
            },
            imagery: {
                icons: '⚖️ 📜 🏛️ 👨‍⚖️',
                headerImage: 'legal-header.jpg'
            }
        },
        terminology: {
            user: 'client',
            consultation: 'consultation',
            advisor: 'legal counsel'
        },
        compliance: {
            disclaimer: 'This message contains privileged and confidential information...',
            regulations: ['Bar Association', 'Client Privilege']
        }
    }
}

export const getIndustryVariant = (industry, template) => {
    const variant = industryVariants[industry] || industryVariants.default
    return customizeTemplateForIndustry(template, variant)
}

function customizeTemplateForIndustry(template, variant) {
    // Implement industry-specific customization logic
    return template
}
